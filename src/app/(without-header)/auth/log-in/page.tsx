'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth'
import { useAuthStore } from '@/store/auth-store'
import { validateEmail, validatePassword } from '@/lib/validation'

import Input from '../_components/input'
import FormError from '../_components/form-error'
import Button from '../_components/button'
import Modal from '@/common/modal'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [showModal, setShowModal] = useState(false)

  const setAuth = useAuthStore((state) => state.setAuth)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailMsg = validateEmail(email)
    const passwordMsg = validatePassword(password, {
      requireSpecialChar: false,
    })

    setEmailError(emailMsg)
    setPasswordError(passwordMsg)

    if (emailMsg || passwordMsg || isLoading) return

    try {
      setIsLoading(true)
      const { user } = await login({
        email: email.trim(),
        password: password.trim(),
      })

      setAuth(user)

      const redirectPath =
        sessionStorage.getItem('redirectAfterLogin') || '/'
      sessionStorage.removeItem('redirectAfterLogin')

      router.push(
        redirectPath.startsWith('/auth') ? '/' : redirectPath,
      )
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.'
      setModalMessage(message)
      setShowModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
      >
        <h3 className="text-2xl font-bold text-center mb-2">
          로그인
        </h3>
        <p className="text-center text-sm text-gray-400 mb-6">
          계정에 로그인하여 독서 여행을 계속하세요
        </p>

        <label
          className="text-sm font-semibold mb-2 block"
          htmlFor="email"
        >
          이메일
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          placeholder="your@email.com"
          onChange={(e) => {
            const value = e.target.value
            setEmail(value)
            setEmailError(validateEmail(value))
          }}
          hasError={!!emailError}
        />
        <FormError message={emailError} />

        <label
          className="text-sm font-semibold mb-2 block"
          htmlFor="password"
        >
          비밀번호
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            const value = e.target.value
            setPassword(value)
            setPasswordError(validatePassword(value))
          }}
          hasError={!!passwordError}
        />
        <FormError message={passwordError} />

        <Button
          isLoading={isLoading}
          disabled={
            !email || !password || !!emailError || !!passwordError
          }
        >
          로그인
        </Button>

        <div className="text-sm text-center">
          계정이 없으신가요?{' '}
          <a
            href="/auth/sign-up"
            className="text-blue-500 font-semibold"
          >
            회원가입
          </a>
        </div>
      </form>

      {showModal && (
        <Modal>
          <p className="text-center text-lg font-semibold mb-2">
            {modalMessage}
          </p>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowModal(false)}
              className="bg-slate-950 hover:bg-gray-800 hover:cursor-pointer text-white text-sm py-2 px-4 rounded"
            >
              닫기
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
