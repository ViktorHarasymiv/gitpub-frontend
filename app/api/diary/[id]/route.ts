import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';

type Props = {
  params: Promise<{ _id: string }>;
};
export async function GET(request: Request, { params }: Props) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const { _id } = await params;
  const resp = await api(`/diaries/${_id}`, {
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

export async function DELETE(request: Request, { params }: Props) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const { _id } = await params;

  try {
    await api.delete(`/diaries/${_id}`, {
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

export async function PATCH(request: Request, { params }: Props) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const { _id } = await params;

  try {
    const body = await request.json();

    const resp = await api.patch(`/diaries/${_id}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        //   Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(resp.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update diary' },
      { status: 500 }
    );
  }
}
