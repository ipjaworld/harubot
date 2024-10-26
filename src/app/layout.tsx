import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/app/components/common/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '하루봇 - 당신의 일상 비서',
  description: '하루를 더 스마트하게 관리하세요',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}