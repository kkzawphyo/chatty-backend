/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Response } from 'express';
import { AuthPayload, IAuthDocument } from '@auth/interfaces/auth.interface';

export const authMockRequest = (sessionData: IJWT, body: IAuthMock, currentUser?: AuthPayload | null, params?: any) => ({
  session: sessionData,
  body,
  params,
  currentUser
});

export const authMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export interface IJWT {
  jwt?: string;
}

export interface IAuthMock {
  _id?: string;
  username?: string;
  email?: string;
  uId?: string;
  password?: string;
  avatarColor?: string;
  avatarImage?: string;
  createdAt?: Date | string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  quote?: string;
  work?: string;
  school?: string;
  location?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  messages?: boolean;
  reactions?: boolean;
  comments?: boolean;
  follows?: boolean;
}

export const authUserPayload: AuthPayload = {
  userId: '64a608ce8b051b7f2ea4a051',
  uId: '521988558081',
  username: 'zawphyo',
  email: 'zawphyo@gmail.com',
  avatarColor: 'blue',
  iat: 12345
};

export const authMock = {
  _id: '64a608ce8b051b7f2ea4a050',
  uId: '521988558081',
  username: 'zawphyo',
  email: 'zawphyo@gmail.com',
  avatarColor: 'blue',
  createdAt: '2023-07-06T00:20:30.918+00:00',
  save: () => {},
  comparePassword: () => false
} as unknown as IAuthDocument;
