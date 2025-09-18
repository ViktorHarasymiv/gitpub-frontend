// app/api/auth/session/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!refreshToken || !sessionId) {
    return NextResponse.json({ error: "Missing session" }, { status: 401 });
  }

  try {
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken, sessionId }),
        credentials: "include",
      }
    );

    if (!backendRes.ok) {
      console.error("Refresh failed with status:", backendRes.status);
      return NextResponse.json(
        { error: "Refresh failed" },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();

    const response = NextResponse.json({ success: true });

    if (data.accessToken) {
      response.cookies.set("accessToken", data.accessToken, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60,
      });
    }

    if (data.refreshToken) {
      response.cookies.set("refreshToken", data.refreshToken, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
      });
    }

    if (data.sessionId) {
      response.cookies.set("sessionId", data.sessionId, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
      });
    }

    return response;
  } catch (err) {
    console.error("Session refresh failed:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
