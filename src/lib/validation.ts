interface PasswordValidationOptionsType {
  requireSpecialChar?: boolean
}

// 이메일 유효성 검사 함수
export function validateEmail(email: string): string {
  const trimmed = email.trim()
  if (!trimmed) return '이메일을 입력해 주세요.'

  const emailRegex =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/

  if (!emailRegex.test(trimmed)) {
    return '올바른 이메일 주소를 입력해 주세요.'
  }

  return ''
}

// 닉네임 유효성 검사 함수
export function validateNickname(nickName: string): string {
  const trimmed = nickName.trim()

  if (!trimmed) {
    return '사용하실 닉네임을 입력해 주세요.'
  }
  if (trimmed.length > 7) {
    return '닉네임은 7글자 이하로 설정해주세요.'
  }

  return ''
}

// 비밀번호 유효성 검사 함수
export function validatePassword(
  password: string,
  options: PasswordValidationOptionsType = {},
): string {
  const { requireSpecialChar = false } = options
  const trimmed = password.trim()
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>_\-+=\\[\]~`]/

  if (!trimmed) return '비밀번호를 입력해 주세요.'
  if (trimmed.length < 8)
    return '비밀번호는 최소 8자 이상이어야 합니다.'
  if (requireSpecialChar && !specialCharRegex.test(trimmed)) {
    return '비밀번호에 특수문자를 하나 이상 포함해 주세요.'
  }

  return ''
}

// 비밀번호 확인 검사 함수
export function validateConfirm(
  confirm: string,
  password: string,
): string {
  return confirm !== password ? '비밀번호가 일치하지 않습니다.' : ''
}
