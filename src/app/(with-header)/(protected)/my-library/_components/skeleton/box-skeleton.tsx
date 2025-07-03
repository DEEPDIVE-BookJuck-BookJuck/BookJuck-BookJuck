interface BoxSkeletonProps {
  className?: string
}

export default function BoxSkeleton({
  className = '',
}: BoxSkeletonProps) {
  return <div className={`bg-gray-200 animate-pulse ${className}`} />
}
