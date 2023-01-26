import Container from '@/components/atoms/Container'
import Image from '@/components/atoms/Image'
import classNames from 'classnames'

export default function Gallery({ images, style }) {
  const { grayBackground, paddingBottom, paddingTop } = style ?? {}

  return (
    <div
      className={classNames(
        grayBackground && 'bg-zinc-200/60',
        paddingTop > 19 && `pt-10 lg:pt-20`,
        paddingTop > 9 && paddingTop < 20 && `pt-5 lg:pt-10`,
        paddingTop < 10 && `pt-2 lg:pt-4`,
        paddingBottom > 19 && `pb-10 lg:pb-20`,
        paddingBottom > 9 && paddingBottom < 20 && `pb-5 lg:pb-10`,
        paddingBottom < 10 && `pb-2 lg:pb-4`
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
