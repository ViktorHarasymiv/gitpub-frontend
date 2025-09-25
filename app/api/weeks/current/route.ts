import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { AxiosError } from 'axios';
import { api } from '../../api';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const dueDate = request.nextUrl.searchParams.get('dueDate');

    const { data } = await api.get('/api/weeks/current', {
      params: { dueDate },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    console.log('error', error);

    return NextResponse.json(
      { error: error.response?.data.error || 'Failed to fetch current week' },
      { status: error.response?.status || 500 }
    );
  }
}
