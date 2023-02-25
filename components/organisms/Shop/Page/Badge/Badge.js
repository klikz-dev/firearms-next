import Image from '@/components/atoms/Image'

export default function Badge({ pageStats, small = false }) {
  const score =
    pageStats.acc +
    pageStats.erg +
    pageStats.ftr +
    pageStats.fit +
    pageStats.rel +
    pageStats.val

  if (small) {
    return (
      <div className={'relative'}>
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
    )
  }

  return (
    <div className={'relative mb-12'}>
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
  )
}
