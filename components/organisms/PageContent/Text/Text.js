import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import HTMLContent from '@/components/atoms/HTMLContent'
import Link from '@/components/atoms/Link'
import Title from '@/components/molecules/Title'
import classNames from 'classnames'

export default function Text({ buttonLink, buttonText, text, title }) {
  return (
    <div className={'py-20'}>
      <Container>
        <div className={classNames(`flex gap-8 justify-between items-center`)}>
          <div className={'w-full text-center'}>
            <Title className={'mb-12'}>
              <h2>{title}</h2>
            </Title>

            <HTMLContent>{text}</HTMLContent>

            {buttonLink && (
              <Link href={buttonLink} className={'mt-12'}>
                <Button color={'red'}>{buttonText}</Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
