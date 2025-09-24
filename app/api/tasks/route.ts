import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import type { AxiosError } from 'axios';
import { api } from '../api';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const accessToken = cookieStore.get('accessToken')?.value;

    const { data } = await api.get('/api/tasks', {
      params: { status, page, limit },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return NextResponse.json(
      { error: error.response?.data.message || 'Failed to fetch tasks' },
      { status: error.response?.status || 500 }
    );
  }
}

//==========================================================================

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();
    const accessToken = cookieStore.get('accessToken')?.value;

    const { data } = await api.post('/api/tasks', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return NextResponse.json(
      { error: error.response?.data.message || 'Failed to create task' },
      { status: error.response?.status || 500 }
    );
  }
}
