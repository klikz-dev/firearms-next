import Container from '@/components/atoms/Container'
import Image from '@/components/atoms/Image'

export default function Gallery({ images }) {
  return (
    <div className={'py-4'}>
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
