import Container from '@/components/atoms/Container'
import Image from '@/components/atoms/Image'
import classNames from 'classnames'

export default function Gallery({ images, style }) {
  const { grayBackground, paddingBottom, paddingTop } = style ?? {}

  return (
    <div
      className={classNames(
        'py-10 lg:py-20',
        grayBackground && 'bg-zinc-200/60',
        `pt-${paddingTop / 2} lg:pt-${paddingTop} pb-${
          paddingBottom / 2
        } lg:pb-${paddingBottom}`
      )}
    >
      <Container className={'max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-4'}>
        {images?.map((image, index) => (
          <Image
            key={index}
            src={image.image?.sourceUrl}
            width={image.image?.mediaDetails?.width || 80}
            height={image.image?.mediaDetails?.height || 80}
            alt={image.image?.altText}
          />
        ))}
      </Container>
    </div>
  )
}
