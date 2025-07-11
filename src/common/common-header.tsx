'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  House,
  Library,
  Menu,
  User,
  LogIn,
  LogOut,
  UserPlus,
} from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { logout } from '@/lib/auth'
import { useEffect, useState } from 'react'
import Modal from './modal'

export default function Header() {
  const pathname = usePathname()
  const accessToken = useAuthStore((state) => state.accessToken)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const confirmLogout = () => {
    setShowLogoutConfirm(true)
  }

  const handleLogout = () => {
    logout()
    clearAuth()
    window.location.href = '/'
  }

  const navItems = [
    {
      href: '/',
      label: '홈',
      icon: () => <House className="size-4" />,
    },
    {
      href: '/my-library',
      label: '내 서재',
      icon: () => <Library className="size-4" />,
    },
    {
      href: '/my-page',
      label: '마이페이지',
      icon: () => <User className="size-4" />,
    },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-all duration-200
        ${isMenuOpen ? 'flex md:flex lg:hidden' : 'flex'}`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-3">
          {/* 로고 */}
          <div className="flex items-center gap-2 text-xl font-bold">
            <BookOpen className="size-7 text-blue-500" />
            <Link href="/">BookHub</Link>
          </div>

          {/* 데스크탑용 네비게이션 */}
          <nav className="hidden md:hidden lg:flex flex-1 justify-center gap-6 text-sm font-medium">
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

          {/* 데스크탑용 버튼 */}
          <div className="hidden md:hidden lg:flex gap-2 text-sm">
            {accessToken ? (
              <button
                onClick={confirmLogout}
                className="px-4 py-2 border bg-slate-950 text-white rounded hover:bg-gray-800 hover: cursor-pointer"
              >
                로그아웃
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block md:block lg:hidden"
          >
            <Menu className="size-7" />
          </button>
        </div>
      </header>

      {/* 모바일 사이드 메뉴 */}
      <div
        className={`flex md:flex lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="w-full h-full bg-gray-800/50"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`fixed top-0 right-0 h-full bg-white w-[70vw] max-w-xs px-6 py-8 z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 py-2 text-md font-semibold text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon />
                  {label}
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-300">
              {accessToken ? (
                <button
                  onClick={() => {
                    confirmLogout()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center gap-3 text-md font-semibold text-gray-900"
                >
                  <LogOut className="size-4" />
                  로그아웃
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/auth/log-in"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 text-md font-semibold text-gray-900"
                  >
                    <LogIn className="size-4" />
                    로그인
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 text-md font-semibold text-gray-900"
                  >
                    <UserPlus className="size-4" />
                    회원가입
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showLogoutConfirm && (
        <Modal>
          <div className="text-center mb-4">
            <p className="text-md font-semibold mb-2">
              로그아웃하시겠습니까?
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleLogout}
              className="bg-slate-950 text-white text-sm py-2 px-4 rounded hover:bg-gray-800 cursor-pointer"
            >
              예
            </button>
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="border border-gray-300 text-sm py-2 px-4 rounded hover:bg-gray-100 cursor-pointer"
            >
              아니오
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
