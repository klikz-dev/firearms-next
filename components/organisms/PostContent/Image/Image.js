import Image from '@/components/atoms/Image'

export default function PostImage({ image, description }) {
  return (
    <figure className={'mb-8'}>
      <Image
        src={image?.sourceUrl}
        alt={description || image?.altText}
        width={image?.mediaDetails?.width}
        height={image?.mediaDetails?.height}
      />

      {description && (
        <figcaption className={'text-zinc-500 text-sm text-center px-3 py-2'}>
          {description}
        </figcaption>
      )}
    </figure>
  )
}
