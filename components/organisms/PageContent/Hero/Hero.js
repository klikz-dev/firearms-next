import Container from '@/components/atoms/Container'
import Image from '@/components/atoms/Image'

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  redBackground,
  mobileBackground,
}) {
  return (
    <>
      <div className={'hidden lg:block'}>
        {redBackground ? (
          <div className={'relative'}>
            <div className={'flex flex-row justify-end'}>
              <div className={'relative h-80 w-3/5'}>
                <Image
                  src={backgroundImage?.sourceUrl}
                  fill={true}
                  alt={backgroundImage?.altText}
                  className={'object-cover'}
                  priority={true}
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
                  <h1 className={'text-white'}>{title}</h1>

                  <div className={'pt-0.5 bg-white w-12 my-5'} />

                  {subtitle && <p className={'text-white mb-6'}>{subtitle}</p>}
                </div>
              </Container>
            </div>
          </div>
        ) : (
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
              <Container className={'py-20 h-full'}>
                <div
                  className={
                    'max-w-sm h-full flex flex-col justify-center items-start'
                  }
                >
                  <h2 className={'text-white'}>{title}</h2>

                  <div className={'h-1 bg-white w-12 my-5'} />

                  {subtitle && <p className={'text-white mb-6'}>{subtitle}</p>}
                </div>
              </Container>
            </div>
          </div>
        )}
      </div>

      <div className={'lg:hidden'}>
        <Container
          className={'py-10 h-full bg-gradient-to-r from-red-800 to-red-500'}
        >
          <div
            className={
              'max-w-sm h-full flex flex-col justify-center items-start'
            }
          >
            <h2 className={'text-white'}>{title}</h2>

            <div className={'h-1 bg-white w-12 my-5'} />

            {subtitle && <p className={'text-white mb-6'}>{subtitle}</p>}
          </div>
        </Container>

        <div className={'relative w-full'}>
          <Image
            src={mobileBackground?.sourceUrl ?? backgroundImage?.sourceUrl}
            width={
              mobileBackground?.mediaDetails?.width ??
              backgroundImage?.mediaDetails?.width
            }
            height={
              mobileBackground?.mediaDetails?.height ??
              backgroundImage?.mediaDetails?.height
            }
            alt={mobileBackground?.altText ?? backgroundImage?.altText}
            className={'w-full'}
            priority={true}
          />
        </div>
      </div>
    </>
  )
}
