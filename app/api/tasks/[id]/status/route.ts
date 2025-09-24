import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import type { AxiosError } from 'axios';
import { api } from '@/lib/api/api';

interface StatusProps {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: StatusProps) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();
    const { id } = await params;
    const accessToken = cookieStore.get('accessToken')?.value;

    const { data } = await api.patch(`/api/tasks/${id}/status`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return NextResponse.json(
      { error: error.response?.data.message || 'Failed to update task status' },
      { status: error.response?.status || 500 }
    );
  }
}
