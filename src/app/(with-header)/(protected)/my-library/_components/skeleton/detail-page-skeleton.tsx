import BoxSkeleton from './box-skeleton'

export default function DetailPageSkeleton() {
  return (
    <>
      <div className="lg:col-span-1">
        <BoxSkeleton className="h-80 rounded-md" />
      </div>
      <div className="lg:col-span-2 space-y-6">
        <BoxSkeleton className="h-600 w-full rounded-md" />
      </div>
    </>
  )
}
