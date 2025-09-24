import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import type { AxiosError } from 'axios';
import { api } from '../api';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');

    const { data } = await api.get('/api/tasks', {
      params: { status, page, limit },
      headers: {
        Cookie: cookieStore.toString(),
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
    const cookieStore = cookies();
    const body = await request.json();

    const { data } = await api.post('/api/tasks', body, {
      headers: {
        Cookie: cookieStore.toString(),
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
