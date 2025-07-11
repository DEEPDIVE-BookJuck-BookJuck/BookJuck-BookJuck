import SearchSkeleton from './search-skeleton'
import BookCardSkeleton from './book-card-skeleton'

export default function ListPageSkeleton() {
  return (
    <div className="min-h-screen p-4">
      <SearchSkeleton />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
