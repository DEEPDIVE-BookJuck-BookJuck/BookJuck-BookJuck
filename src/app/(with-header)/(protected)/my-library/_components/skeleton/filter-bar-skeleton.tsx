import BoxSkeleton from './box-skeleton'

export default function FilterBarSkeleton() {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-4">
        <BoxSkeleton className="h-10 w-full rounded-md" />
        <div className="flex w-full justify-between gap-4">
          <BoxSkeleton className="h-8 w-32 rounded-md" />{' '}
          <BoxSkeleton className="h-8 w-36 rounded-md" />{' '}
        </div>
      </div>
    </div>
  )
}
