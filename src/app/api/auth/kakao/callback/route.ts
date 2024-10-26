// src/app/api/auth/kakao/callback/route.ts
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return new Response('Authorization code not found', { status: 400 });
  }

  try {
    // 1. 카카오 토큰 받기
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();
    
    // 토큰 응답 확인
    if (!tokenData.access_token) {
      console.error('Token data:', tokenData);
      throw new Error('Failed to get access token');
    }

    // 2. 카카오 사용자 정보 받기
    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();
    console.log('Kakao user data:', userData); // 디버깅용

    // 3. 안전하게 사용자 데이터 추출
    const userInfo = {
      id: userData.id,
      nickname: userData.properties?.nickname || '이름 없음',
      profileImage: userData.properties?.profile_image || null,
      email: userData.kakao_account?.email || null
    };

    // 4. 세션 쿠키 설정
    cookies().set('session_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24
    });

    // 5. 사용자 정보 쿠키 설정
    cookies().set('user', JSON.stringify(userInfo), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24
    });

    // 6. 메인 페이지로 리다이렉트
    return Response.redirect(new URL('/', request.url));

  } catch (error) {
    console.error('Kakao login error:', error);
    // 에러 발생 시 상세 정보 로깅
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    return Response.redirect(new URL('/login?error=kakao_login_failed', request.url));
  }
}