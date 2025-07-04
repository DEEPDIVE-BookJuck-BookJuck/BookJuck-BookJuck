export interface ReviewType {
  endDate: string
  memo: string
  rating: number
  tags: string[]
}

export interface BookType {
  id: string
  title: string
  author: string
  thumbnailUrl: string
  review: ReviewType
}

export interface ProfileType {
  nickName: string
  email: string
  created_at: string
  updated_at: string
}
