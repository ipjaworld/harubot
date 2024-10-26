// src/app/components/common/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image'; // next/image import 추가
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface User {
  nickname: string;
  profileImage?: string;
}

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // src/app/components/common/Header.tsx의 checkLoginStatus 함수 수정
  const checkLoginStatus = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // 인증 실패 시 사용자 상태 초기화
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to check login status:', error);
      setUser(null);
    }
  };

  // src/app/components/common/Header.tsx
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // 쿠키 포함
      });

      const data = await response.json();

      if (data.success) {
        setUser(null);
        // 로그인 페이지로 리다이렉트
        window.location.href = data.redirect;
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // 에러 처리 (사용자에게 알림 등)
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          하루봇
        </Link>

        <div className="flex items-center gap-4">
          {!user ? (
            pathname !== '/login' && (
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                로그인
              </Link>
            )
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 hover:opacity-80"
              >
                <span className="text-sm font-medium">{user.nickname}</span>
                {user.profileImage && (
                  <Image
                    src={user.profileImage}
                    alt="Profile"
                    width={32} // w-8 = 32px
                    height={32} // h-8 = 32px
                    className="rounded-full"
                    priority // LCP 최적화를 위해 priority 추가
                  />
                )}
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    대시보드
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    설정
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
