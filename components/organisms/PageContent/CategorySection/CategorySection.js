import Container from '@/components/atoms/Container'
import GradientBorder from '@/components/atoms/GradientBorder'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import convertToSlug from '@/functions/convertToSlug'
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export default function CategorySection({
  index,
  title,
  text,
  image,
  links,
  style,
}) {
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
      <Container className={'border-b-2'} id={convertToSlug(title)}>
        <Image
          src={image?.sourceUrl}
          width={image?.mediaDetails?.width}
          height={image?.mediaDetails?.height}
          alt={image?.altText}
          className={'mb-4'}
        />

        <div className='py-4 px-1'>
          <h6 className={'text-red-600'}>{`Section ${index + 1}`}</h6>

          <h2>{title}</h2>

          <GradientBorder height={2} className={'w-40 my-4'} />

          <p className={'mb-8'}>{text}</p>

          <div className={'grid lg:grid-cols-3 gap-4'}>
            {links?.map((link, i1) => (
              <div key={i1}>
                <FontAwesomeIcon
                  icon={faCrosshairs}
                  className={'mr-1 text-red-700'}
                />
                <Link href={link.link} className={'hover:text-red-700'}>
                  {link.text}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
