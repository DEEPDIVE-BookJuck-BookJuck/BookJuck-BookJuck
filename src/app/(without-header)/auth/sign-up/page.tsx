'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signup } from '@/lib/auth'
import Input from '../_components/input'
import FormError from '../_components/form-error'
import Button from '../_components/button'
import Modal from '@/common/modal'

export default function SignupPage() {
  const [nickName, setNickName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [nickNameError, setNickNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmError, setConfirmError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const router = useRouter()

  const validateNickname = (nickName: string) =>
    nickName.trim() ? '' : '사용하실 닉네임을 입력해 주세요.'

  const validateEmail = (email: string) =>
    !email.trim()
      ? '이메일을 입력해 주세요.'
      : /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/.test(
          email.trim(),
        )
      ? ''
      : '올바른 이메일 주소를 입력해 주세요.'

  const validatePassword = (pw: string) => {
    const trimmed = pw.trim()
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>_\-+=\\[\]~`]/

    if (!trimmed) return '비밀번호를 입력해 주세요.'
    if (trimmed.length < 8)
      return '비밀번호는 최소 8자 이상이어야 합니다.'
    if (!specialCharRegex.test(trimmed))
      return '비밀번호에 특수문자를 하나 이상 포함해 주세요.'
    return ''
  }

  const validateConfirm = (confirm: string, pw: string) =>
    confirm !== pw ? '비밀번호가 일치하지 않습니다.' : ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const nickNameMsg = validateNickname(nickName)
    const emailMsg = validateEmail(email)
    const pwMsg = validatePassword(password)
    const confirmMsg = validateConfirm(confirmPassword, password)

    setNickNameError(nickNameMsg)
    setEmailError(emailMsg)
    setPasswordError(pwMsg)
    setConfirmError(confirmMsg)

    if (nickNameMsg || emailMsg || pwMsg || confirmMsg) return

    try {
      setIsLoading(true)
      await signup({
        nickName: nickName.trim(),
        email: email.trim(),
        password,
      })
      setModalMessage('회원가입이 완료되었습니다!')
      setShowModal(true)
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : '회원가입 중 오류가 발생했습니다.'
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
          회원가입
        </h3>
        <p className="text-center text-sm text-gray-400 mb-6">
          새 계정을 만들어 독서 여행을 시작하세요
        </p>

        <label
          className="text-sm font-semibold mb-2 block"
          htmlFor="nickname"
        >
          닉네임
        </label>
        <Input
          id="nickname"
          type="text"
          placeholder="홍길동"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          hasError={!!nickNameError}
        />
        <FormError message={nickNameError} />

        <label
          className="text-sm font-semibold mt-4 mb-2 block"
          htmlFor="email"
        >
          이메일
        </label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          hasError={!!emailError}
        />
        <FormError message={emailError} />

        <label
          className="text-sm font-semibold mt-4 mb-2 block"
          htmlFor="password"
        >
          비밀번호
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hasError={!!passwordError}
        />
        <FormError message={passwordError} />

        <label
          className="text-sm font-semibold mt-4 mb-2 block"
          htmlFor="confirm"
        >
          비밀번호 확인
        </label>
        <Input
          id="confirm"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          hasError={!!confirmError}
        />
        <FormError message={confirmError} />

        <Button isLoading={isLoading}>회원가입</Button>

        <div className="text-sm text-center">
          이미 계정이 있으신가요?{' '}
          <a
            href="/auth/log-in"
            className="text-blue-500 font-semibold"
          >
            로그인
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
              onClick={() => {
                setShowModal(false)
                if (modalMessage.includes('완료')) {
                  router.push('/auth/log-in')
                }
              }}
              className="bg-slate-950 hover:bg-gray-800 text-white text-sm py-2 px-4 rounded"
            >
              확인
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
