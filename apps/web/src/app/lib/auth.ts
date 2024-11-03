import { signIn, signOut } from 'next-auth/react';

export const login = async () => {
  try {
    await signIn('kakao', { callbackUrl: '/' });
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut({ callbackUrl: '/auth/login' });
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getUser = async () => {
  const response = await fetch('/api/auth/session');
  const session = await response.json();
  return session?.user;
};