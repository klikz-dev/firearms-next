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
        grayBackground && 'bg-zinc-200/60',
        paddingTop > 19 && `pt-10 lg:pt-20`,
        paddingTop > 9 && paddingTop < 20 && `pt-5 lg:pt-10`,
        paddingTop < 10 && `pt-2 lg:pt-4`,
        paddingBottom > 19 && `pb-10 lg:pb-20`,
        paddingBottom > 9 && paddingBottom < 20 && `pb-5 lg:pb-10`,
        paddingBottom < 10 && `pb-2 lg:pb-4`
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
