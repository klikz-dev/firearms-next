import Image from '@/components/atoms/Image'

export default function PostImage({ image, description }) {
  return (
    <div className={'mb-8 bg-zinc-50 border border-zinc-300'}>
      <Image
        src={image?.sourceUrl}
        alt={image?.altText}
        width={image?.mediaDetails?.width}
        height={image?.mediaDetails?.height}
      />

      <div
        className={
          'bg-gradient-to-r from-red-800 to-red-500 text-white text-center text-sm px-3 py-1'
        }
      >
        {description}
      </div>
    </div>
  )
}
