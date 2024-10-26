// src/app/api/auth/me/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sessionToken = cookies().get('session_token');

    if (!sessionToken) {
      return new Response('Unauthorized', { status: 401 });
    }

    // 카카오 사용자 정보 직접 조회
    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${sessionToken.value}`,
      },
    });

    if (!userResponse.ok) {
      // 토큰이 유효하지 않은 경우
      cookies().delete('session_token');
      return new Response('Token invalid', { status: 401 });
    }

    const userData = await userResponse.json();

    // 사용자 정보를 필요한 형식으로 변환
    const userInfo = {
      id: userData.id,
      nickname: userData.properties?.nickname || '사용자',
      profileImage: userData.properties?.profile_image || null,
      email: userData.kakao_account?.email,
    };

    // 성공 응답
    return NextResponse.json(userInfo);

  } catch (error) {
    console.error('Auth check error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}