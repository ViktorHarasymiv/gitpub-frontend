import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();

  const { data } = await api('/diaries', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (data) {
    return NextResponse.json(data);
  }

  return NextResponse.json(
    { error: 'Failed to fetch diaries' },
    { status: 500 }
  );
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  try {
    const body = await request.json();

    const resp = await api.post('/diaries', body, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json',
      },
    });

    if (resp.data) {
      return NextResponse.json(resp.data, { status: 201 });
    }
  } catch (error) {
    console.log('Error creating a diary:', error);
    return NextResponse.json(
      { error: `Failed to create note, ${error}` },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies();

  try {
    const { _id, ...data } = await request.json();

    const resp = await api.patch(`/diaries/${_id}`, data, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json',
      },
    });

    if (resp.data) {
      return NextResponse.json(resp.data, { status: 201 });
    }
  } catch (error) {
    console.log('Error creating a diary:', error);
    return NextResponse.json(
      { error: `Failed to create note, ${error}` },
      { status: 500 }
    );
  }
}
