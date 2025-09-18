import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { parse } from "cookie";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken) {
    return NextResponse.json({ success: true });
  }

  if (refreshToken) {
    const cookieHeader = `refreshToken=${refreshToken}`;

    try {
      const apiRes = await api.get("/auth/session", {
        headers: { Cookie: cookieHeader },
      });

      const setCookie = apiRes.headers["set-cookie"];
      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        const response = NextResponse.json({ success: true });

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path || "/",
            maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
            httpOnly: true,
            secure: true,
            sameSite: ["lax", "strict", "none"].includes(
              parsed.SameSite?.toLowerCase() ?? ""
            )
              ? (parsed.SameSite?.toLowerCase() as "lax" | "strict" | "none")
              : "lax",
          };

          if (parsed.accessToken) {
            response.cookies.set("accessToken", parsed.accessToken, options);
          }
          if (parsed.refreshToken) {
            response.cookies.set("refreshToken", parsed.refreshToken, options);
          }
        }

        return response;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Session refresh failed:", {
          message: error.message,
          stack: error.stack,
        });
      } else {
        console.error("Unknown error:", error);
      }
    }
  }

  return NextResponse.json({ success: false });
}
