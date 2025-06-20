import { ReactElement } from 'react'

export type IconKeyType =
  | 'totalBooks'
  | 'reviewBooks'
  | 'currentStreak'
  | 'longestStreak'

export type IconObjType = Record<
  IconKeyType,
  {
    title: string
    component: ReactElement
  }
>
