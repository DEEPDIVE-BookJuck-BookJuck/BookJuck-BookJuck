'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: '홈', iconClass: 'fas fa-house' },
    {
      href: '/mylibrary',
      label: 'My Library',
      iconClass: 'fas fa-book',
    },
    {
      href: '/mypage',
      label: '마이페이지',
      iconClass: 'fas fa-user',
    },
  ]

  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-md">
      {/* 로고 */}
      <div className="flex items-center gap-2 text-xl font-bold">
        <i className="fa-solid fa-book-open text-blue-600"></i>
        <Link href="/">BookHub</Link>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 flex justify-center gap-6 text-sm font-medium">
        {navItems.map(({ href, label, iconClass }) => {
          const isActive = pathname === href

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-4 px-3 py-2 rounded
                ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:text-blue-600'
                }
              `}
            >
              <i className={iconClass}></i>
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="flex gap-2 text-sm">
        <Link href="/auth/login">
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
            로그인
          </button>
        </Link>
        <Link href="/auth/signup">
          <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
            회원가입
          </button>
        </Link>
      </div>
    </header>
  )
}
