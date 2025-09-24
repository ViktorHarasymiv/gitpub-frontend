import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AxiosError } from 'axios';
import { api } from '@/app/api/api';

interface WeekNumberProps {
  params: Promise<{ weekNumber: string }>;
}

export async function GET(request: NextRequest, { params }: WeekNumberProps) {
  try {
    const cookieStore = await cookies();
    const { weekNumber } = await params;
    const { data } = await api.get(`/api/weeks/${weekNumber}/baby`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    if (data) {
      return NextResponse.json(data);
    }
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    return NextResponse.json(
      {
        error:
          error.response?.data.error ||
          'Failed to fetch current week baby info',
      },
      { status: error.response?.status || 500 }
    );
  }
}
