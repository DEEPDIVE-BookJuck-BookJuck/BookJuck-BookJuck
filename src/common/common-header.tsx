'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, House, Library, User } from 'lucide-react'

export default function Header() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/',
      label: '홈',
      icon: () => <House className="size-4" />,
    },
    {
      href: '/my-library',
      label: 'My Library',
      icon: () => <Library className="size-4" />,
    },
    {
      href: '/my-page',
      label: '마이페이지',
      icon: () => <User className="size-4" />,
    },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* 로고 */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <BookOpen className="size-7 text-blue-500" />
          <Link href="/">BookHub</Link>
        </div>

        {/* 네비게이션 */}
        <nav className="flex-1 flex justify-center gap-6 text-sm font-medium">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-4 px-3 py-2 rounded
                ${
                  isActive
                    ? 'bg-slate-950 text-white'
                    : 'text-gray-700 hover:text-blue-500'
                }
              `}
              >
                <Icon />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex gap-2 text-sm">
          <Link href="/auth/log-in">
            <button className="px-4 py-2 border border-gray-200 rounded hover:bg-gray-100 hover: cursor-pointer">
              로그인
            </button>
          </Link>
          <Link href="/auth/sign-up">
            <button className="px-4 py-2 bg-slate-950 text-white rounded hover:bg-gray-800 hover: cursor-pointer">
              회원가입
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
