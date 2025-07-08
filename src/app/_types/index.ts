// 원본 API 응답용 도서 아이템
export interface RawBookItemType {
  itemId: string | number
  cover?: string
  title?: string
  author?: string
  isbn?: string  
}

// 앱에서 사용하는 Book 타입 (정제된 형태)
export interface BookType {
  id: string | number
  cover: string
  title: string
  author: string
  isbn: string
}

// 내 서재 추가 API 응답 타입
export interface AddBookResponse {
  message: string
  book: {
    id: string
    isbn: string
    title: string
    author: string
    thumbnailUrl: string
    created_at: string
  }
}
