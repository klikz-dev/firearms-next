import Image from '@/components/atoms/Image'

export default function Badge({ pageStats, small = false, reviewCount }) {
  const score =
    pageStats.acc +
    pageStats.erg +
    pageStats.ftr +
    pageStats.fit +
    pageStats.rel +
    pageStats.val

  if (small) {
    return (
      <div>
        <div className={'relative mb-2'}>
          <div className={'flex justify-center'}>
            {score > 39 ? (
              <Image
                src={'/images/badge-exceptional.png'}
                alt='Badge'
                width={128}
                height={128}
              />
            ) : score > 19 ? (
              <Image
                src={'/images/badge-average.png'}
                alt='Badge'
                width={128}
                height={128}
              />
            ) : (
              <Image
                src={'/images/badge-hit-miss.png'}
                alt='Badge'
                width={128}
                height={128}
              />
            )}
          </div>

          <h4
            className={
              'absolute w-full text-center text-4xl tracking-wider text-white'
            }
            style={{ top: 18 }}
          >
            {score}
          </h4>

          <h4
            className={
              'absolute w-full text-center text-sm tracking-wider text-white'
            }
            style={{ top: 64 }}
          >
            {score > 39 ? 'EXCEPTIONAL' : score > 19 ? 'AVERAGE' : 'HIT & MISS'}
          </h4>
        </div>

        {reviewCount && (
          <p className={'text-center text-xs'}>
            Based On{' '}
            <span className={'font-semibold'}>{`${reviewCount} Rating`}</span>
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={'mb-12'}>
      <div className={'relative mb-4'}>
        <div className={'flex justify-center'}>
          {score > 39 ? (
            <Image
              src={'/images/badge-exceptional.png'}
              alt='Badge'
              width={311}
              height={266}
            />
          ) : score > 19 ? (
            <Image
              src={'/images/badge-average.png'}
              alt='Badge'
              width={311}
              height={266}
            />
          ) : (
            <Image
              src={'/images/badge-hit-miss.png'}
              alt='Badge'
              width={311}
              height={266}
            />
          )}
        </div>

        <h4
          className={
            'absolute w-full text-center text-8xl tracking-wider text-white'
          }
          style={{ top: 40 }}
        >
          {score}
        </h4>

        <h4
          className={
            'absolute w-full text-center text-3xl tracking-wider text-white'
          }
          style={{ top: 164 }}
        >
          {score > 39 ? 'EXCEPTIONAL' : score > 19 ? 'AVERAGE' : 'HIT & MISS'}
        </h4>
      </div>

      {reviewCount && (
        <p className={'text-center text-sm'}>
          Based On{' '}
          <span className={'font-semibold'}>{`${reviewCount} Rating`}</span>
        </p>
      )}
    </div>
  )
}
