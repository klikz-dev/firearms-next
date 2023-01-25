import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import HTMLContent from '@/components/atoms/HTMLContent'
import Link from '@/components/atoms/Link'
import Title from '@/components/molecules/Title'
import classNames from 'classnames'

export default function Text({ buttonLink, buttonText, text, title, style }) {
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
        <div className={'w-full'}>
          {title && (
            <Title className={'mb-12 text-center'}>
              <h2>{title}</h2>
            </Title>
          )}

          <HTMLContent>{text}</HTMLContent>

          {buttonLink && (
            <Link href={buttonLink} className={'mt-12'}>
              <Button color={'red'}>{buttonText}</Button>
            </Link>
          )}
        </div>
      </Container>
    </div>
  )
}
