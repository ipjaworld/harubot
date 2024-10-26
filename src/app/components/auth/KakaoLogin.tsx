'use client'

export default function KakaoLogin() {
  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`
    window.location.href = KAKAO_AUTH_URL
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