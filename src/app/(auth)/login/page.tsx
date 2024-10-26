'use client'

import KakaoLogin from '@/app/components/auth/KakaoLogin'

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">
          로그인
        </h1>
        <KakaoLogin />
      </div>
    </div>
  )
}