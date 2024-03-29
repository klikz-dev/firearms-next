import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Date from '@/components/atoms/Date'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'

export default function HomeHero({ post, hero }) {
  const { slug, title, date, seo } = post ?? {}
  const { metaDesc, opengraphDescription } = seo ?? {}
  const { backgroundImage, mobileBackground } = hero ?? {}

  return (
    <>
      <div className={'lg:hidden'}>
        <Container
          className={'py-10 h-full bg-gradient-to-r from-red-800 to-red-500'}
        >
          <div
            className={
              'max-w-sm h-full flex flex-col justify-center items-start'
            }
          >
            <Date date={date} className={'text-white'} />
            <h2 className={'text-white'}>{title}</h2>

            <div className={'h-1 bg-white w-12 my-5'} />

            <p className={'text-white mb-6 line-clamp-3'}>
              {metaDesc || opengraphDescription}
            </p>

            <Link href={`/${slug}`}>
              <Button>Learn More</Button>
            </Link>
          </div>
        </Container>

        <Image
          src={mobileBackground?.sourceUrl}
          width={mobileBackground?.mediaDetails?.width}
          height={mobileBackground?.mediaDetails?.height}
          alt={mobileBackground?.altText}
          className={'w-full'}
          priority={true}
        />
      </div>

      <div className={'hidden lg:block'}>
        <div className={'relative'}>
          <Image
            src={backgroundImage?.sourceUrl}
            width={backgroundImage?.mediaDetails?.width}
            height={backgroundImage?.mediaDetails?.height}
            alt={backgroundImage?.altText}
            className={'w-full'}
            priority={true}
          />

          <div className={'absolute top-0 left-0 w-full h-full'}>
            <Container className={'py-8 xl:py-20 h-full'}>
              <div
                className={
                  'max-w-sm h-full flex flex-col justify-center items-start'
                }
              >
                <Date date={date} className={'text-white'} />
                <h2 className={'text-white'}>{title}</h2>

                <div className={'h-1 bg-white w-12 my-5'} />

                <p className={'text-white mb-6 line-clamp-3'}>
                  {metaDesc || opengraphDescription}
                </p>

                <Link href={`/${slug}`}>
                  <Button>Learn More</Button>
                </Link>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  )
}
