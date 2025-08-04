import Image from 'next/image'

interface BookThumbnailProps {
  title: string
  src: string
  className?: string
  priority?: boolean
}

export default function BookThumbnail({
  title,
  src,
  className = 'w-16 h-20',
  priority = false,
}: BookThumbnailProps) {
  return (
    <Image
      src={src || '/images/placeholder-book.svg'}
      width={150}
      height={200}
      alt={title}
      className={`object-cover rounded ${className}`}
      priority={priority}
    />
  )
}
