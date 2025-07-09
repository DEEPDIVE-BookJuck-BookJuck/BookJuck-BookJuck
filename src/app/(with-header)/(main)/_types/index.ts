export interface RawBookItemType {
  itemId: string | number
  cover?: string
  title?: string
  author?: string
  isbn?: string  
}

export interface BookType {
  id: string | number
  cover: string
  title: string
  author: string
  isbn: string
}

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
