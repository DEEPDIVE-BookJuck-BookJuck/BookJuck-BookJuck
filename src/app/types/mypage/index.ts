import { ReactElement } from 'react'

export type IconKeyType =
  | 'totalBooks'
  | 'reviewBooks'
  | 'currentStreak'
  | 'longestStreak'

export interface IconObjType {
  totalBooks: {
    title: string
    component: ReactElement
  }
  reviewBooks: {
    title: string
    component: ReactElement
  }
  currentStreak: {
    title: string
    component: ReactElement
  }
  longestStreak: {
    title: string
    component: ReactElement
  }
}

export interface RecentBookItemPropsType {
  title: string
  author: string
  date: string
  rating: number
}

export interface TagType {
  tag: string
  count: number
  percent: number
  originalItems?: Array<{ tag: string; count: number }>
}

export interface TooltipPropsType {
  active?: boolean
  payload?: Array<{
    payload: TagType
  }>
}
