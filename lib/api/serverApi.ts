import { cookies } from 'next/headers';
import nextServer from './api';
import { ServerBoolResponse } from '@/types/user';

// session
export const checkServerSession = async () => {
  const cookieData = await cookies();
  const response = await nextServer<ServerBoolResponse>(`/auth/session`, {
    headers: { Cookie: cookieData.toString() },
  });
  return response;
};
