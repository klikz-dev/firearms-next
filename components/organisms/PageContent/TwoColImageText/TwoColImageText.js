import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import HTMLContent from '@/components/atoms/HTMLContent'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Title from '@/components/molecules/Title'
import classNames from 'classnames'

export default function TwoColImageText({
  title,
  content,
  buttonLink,
  buttonText,
  image,
  imagePosition,
  style,
}) {
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
      <Container>
        <div
          className={classNames(
            `flex flex-col gap-20 lg:gap-8 justify-between items-center`,
            imagePosition === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'
          )}
        >
          <div className={'lg:w-1/2'}>
            <Title className={'mb-12'}>
              <h2>{title}</h2>
            </Title>

            <HTMLContent>{content}</HTMLContent>

            {buttonLink && (
              <Link href={buttonLink} className={'mt-12'}>
                <Button color={'red'}>{buttonText}</Button>
              </Link>
            )}
          </div>

          <div className={'lg:w-1/2'}>
            <Image
              src={image?.sourceUrl}
              width={image?.mediaDetails?.width}
              height={image?.mediaDetails?.height}
              alt={image?.altText}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}
