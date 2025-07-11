import BoxSkeleton from './box-skeleton'

interface DetailPageSkeletonProps {
  mode?: 'view' | 'edit'
}

export default function DetailPageSkeleton({
  mode = 'edit',
}: DetailPageSkeletonProps) {
  const boxHeight = mode === 'view' ? 'h-90' : 'h-[700px]'

  return (
    <>
      <div className="lg:col-span-1">
        <BoxSkeleton className="h-80 rounded-md" />
      </div>
      <div className="lg:col-span-2 space-y-6">
        <BoxSkeleton className={`${boxHeight} w-full rounded-md`} />
      </div>
    </>
  )
}
