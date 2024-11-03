// src/lib/api.ts
import { getSession } from 'next-auth/react';

const NEST_API_URL = process.env.NEXT_PUBLIC_NEST_API_URL || 'http://localhost:3000';

export async function fetchApi(
  endpoint: string,
  options: RequestInit = {}
) {
  const session = await getSession();

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // 인증 토큰이 있다면 헤더에 추가
  if (session?.user?.token) {
    defaultHeaders['Authorization'] = `Bearer ${session.user.token}`;
  }

  const response = await fetch(`${NEST_API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    // API 에러 처리
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

// 편의성을 위한 래퍼 함수들
export const api = {
  get: (endpoint: string) => fetchApi(endpoint),
  
  post: (endpoint: string, data: any) => 
    fetchApi(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  put: (endpoint: string, data: any) =>
    fetchApi(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (endpoint: string) =>
    fetchApi(endpoint, {
      method: 'DELETE',
    }),
};