import { NextResponse, NextRequest } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const resp = await api(`/diaries/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      //   Cookie: cookieStore.toString(),
    },
  });

  if (resp.data) {
    return NextResponse.json(resp.data);
  }

  return NextResponse.json(
    { error: 'Failed to fetch diary entry' },
    { status: 500 }
  );
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const { id } = await params;

  try {
    await api.delete(`/diaries/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        //   Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(
      { message: 'Diary successfully deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error deleting diary:', error);
    return NextResponse.json(
      { error: 'Failed to delete diary' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const { id } = await params;

  try {
    const body = await request.json();

    const resp = await api.patch(`/diaries/${id}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        //   Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(resp.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update diary, ${error}` },
      { status: 500 }
    );
  }
}
