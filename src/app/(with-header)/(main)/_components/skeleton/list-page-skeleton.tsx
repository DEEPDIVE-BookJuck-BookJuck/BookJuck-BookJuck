import HeadingSkeleton from './heading-skeleton'
import SearchSkeleton from './search-skeleton'
import BookCardSkeleton from './book-card-skeleton'

export default function ListPageSkeleton() {
  return (
    <div className="min-h-screen px-8 pb-8 pt-4">
      <HeadingSkeleton />
      <SearchSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
