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
