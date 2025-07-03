import BoxSkeleton from './box-skeleton'

export default function SearchSkeleton() {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex gap-4">
        <BoxSkeleton className="relative flex-1 h-10 rounded" />
      </div>
    </div>
  )
}
