import BoxSkeleton from './box-skeleton'

export default function HeadingSkeleton() {
  return (
    <div className="flex flex-col items-center w-full sm:mb-3.5 md:mb-8 mb-10">
      <BoxSkeleton className="h-14 md:h-12 w-[80%] max-w-xl rounded-lg mb-2" />
    </div>
  )
}
