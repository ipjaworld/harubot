// src/app/components/auth/KakaoLogin.tsx
'use client'

import { signIn } from 'next-auth/react'

export default function KakaoLogin() {
  const handleKakaoLogin = async () => {
    try {
      await signIn('kakao', {
        callbackUrl: '/',
        redirect: true,
      })
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <button
      onClick={handleKakaoLogin}
      className="w-full py-3 px-4 bg-yellow-300 rounded-lg hover:bg-yellow-400 flex items-center justify-center gap-2"
    >
      카카오로 시작하기
    </button>
  )
}