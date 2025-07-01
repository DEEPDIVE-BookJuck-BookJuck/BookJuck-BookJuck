import Image from 'next/image'

interface BookThumbnailProps {
  title: string
  src: string
}

export default function BookThumbnail({
  title,
  src,
}: BookThumbnailProps) {
  return (
    <Image
      src={src || '/images/placeholder-book.svg'}
      width={150}
      height={200}
      alt={title}
      className="w-16 h-20 object-cover rounded"
    />
  )
}
