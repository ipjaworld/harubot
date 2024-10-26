// src/app/api/auth/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const sessionToken = cookies().get('session_token');

  if (sessionToken) {
    try {
      // 1. 카카오 연결 끊기 (선택적)
      const unlinkResponse = await fetch('https://kapi.kakao.com/v1/user/unlink', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionToken.value}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!unlinkResponse.ok) {
        console.error('Kakao unlink failed:', await unlinkResponse.text());
      }

      // 2. 카카오 로그아웃
      const logoutResponse = await fetch('https://kapi.kakao.com/v1/user/logout', {
        method: 'POST',  // GET이 아닌 POST로 변경
        headers: {
          Authorization: `Bearer ${sessionToken.value}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!logoutResponse.ok) {
        console.error('Kakao logout failed:', await logoutResponse.text());
      }

    } catch (error) {
      console.error('Kakao logout error:', error);
    }
  }

  // 3. 모든 관련 쿠키 삭제
  try {
    cookies().delete('session_token');
    cookies().delete('user');
    cookies().delete('kakao_auth'); // 혹시 있을 수 있는 다른 인증 관련 쿠키
  } catch (error) {
    console.error('Cookie deletion error:', error);
  }

  // 4. 클라이언트 리다이렉트 정보 포함
  return NextResponse.json({ 
    success: true,
    redirect: '/login'
  });
}