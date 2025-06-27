export interface UserType {
  id?: string
  email: string
  nickname?: string
}

export interface AuthStateType {
  accessToken: string | null
  user: UserType | null
  setAuth: (accessToken: string, user: UserType) => void
  clearAuth: () => void
}

export interface LoginParamsType {
  email: string
  password: string
}

export interface LoginResponseType {
  accessToken: string
  user: {
    email: string
    nickname: string
  }
}

export interface SignupParamsType {
  nickName: string
  email: string
  password: string
}

export interface SignupResponseType {
  message: string
  accessToken: string
  user: {
    email: string
    nickName: string
  }
}

export interface FetchWithAuthOptionsType extends RequestInit {
  auth?: boolean
}
