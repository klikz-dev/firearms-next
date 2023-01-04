import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Date from '@/components/atoms/Date'
import Image from '@/components/atoms/Image'

export default function Hero({
  title,
  subtitle,
  link,
  backgroundImage,
  redBackground,
}) {
  if (redBackground) {
    return (
      <div className={'relative'}>
        <div className={'flex flex-row justify-end'}>
          <div className={'relative h-96 w-3/5'}>
            <Image
              src={backgroundImage?.sourceUrl}
              fill={true}
              alt={backgroundImage?.altText}
              className={'object-cover'}
            />
          </div>
        </div>

        <div
          className={'absolute top-0 left-0 w-full h-full'}
          style={{
            background:
              'linear-gradient(115deg, #991b1b 0%, #ef4444 50%, transparent 50%, transparent 100%)',
          }}
        >
          <Container className={'py-20 h-full'}>
            <div
              className={
                'max-w-sm h-full flex flex-col justify-center items-start'
              }
            >
              {link && <Date date={link.date} className={'text-white'} />}
              <h2 className={'text-white'}>{title}</h2>

              <div className={'pt-0.5 bg-white w-12 my-5'} />

              <p className={'text-white mb-6'}>{subtitle}</p>

              {link && <Button href={`/${link.slug}`}>Learn More</Button>}
            </div>
          </Container>
        </div>
      </div>
    )
  }

  return (
    <div className={'relative'}>
      <Image
        src={backgroundImage?.sourceUrl}
        width={backgroundImage?.mediaDetails?.width}
        height={backgroundImage?.mediaDetails?.height}
        alt={backgroundImage?.altText}
        className={'w-full'}
      />

      <div className={'absolute top-0 left-0 w-full h-full'}>
        <Container className={'py-20 h-full'}>
          <div
            className={
              'max-w-sm h-full flex flex-col justify-center items-start'
            }
          >
            {link && <Date date={link.date} className={'text-white'} />}
            <h2 className={'text-white'}>{title}</h2>

            <div className={'h-1 bg-white w-12 my-5'} />

            <p className={'text-white mb-6'}>{subtitle}</p>

            {link && <Button href={`/${link.slug}`}>Learn More</Button>}
          </div>
        </Container>
      </div>
    </div>
  )
}
