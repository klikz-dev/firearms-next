import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import { getPage } from '@/functions/fetch/getPage'
import getStats from '@/functions/getStats'
import classNames from 'classnames'

function Stat({ attr }) {
  return (
    <div className={'p-2 h-12 border'}>
      <div className={'bg-zinc-200 w-full h-4 rounded mt-2'}>
        <div
          style={{ width: `${attr * 10}%` }}
          className={classNames(
            'h-full rounded',
            attr > 7
              ? 'bg-green-700'
              : attr > 4
              ? 'bg-yellow-400'
              : 'bg-red-700'
          )}
        >
          <p className='text-xs text-white text-right px-1'>{`${attr}/10`}</p>
        </div>
      </div>
    </div>
  )
}

export default function TableColumn({ description, cta, award }) {
  const { data: page } = getPage(cta.productSlug)

  const { sale_price } = page?.product?.[0] ?? {}

  const pageStats =
    page && page.brand && page.category && page.product
      ? getStats(page.brand.name, page.category.name, page.product.length, {
          acc: page.stat_acc,
          erg: page.stat_erg,
          ftr: page.stat_ftr,
          fit: page.stat_fit,
          rel: page.stat_rel,
          val: page.stat_val,
        })
      : undefined

  const totalScore =
    pageStats?.acc +
    pageStats?.erg +
    pageStats?.ftr +
    pageStats?.fit +
    pageStats?.rel +
    pageStats?.val

  if (!pageStats) return null

  return (
    <div className={'w-full'}>
      <div className={'p-2 h-36 border'}>
        <div className={'w-full h-20 relative'}>
          <Image
            src={cta.image?.sourceUrl}
            alt={cta.image?.altText}
            layout='fill'
            className={'object-contain'}
          />
        </div>

        <Link
          href={cta.link}
          className={'text-sm text-red-700 hover:underline'}
        >
          {cta.title}
        </Link>
      </div>

      <div className='p-2 h-20 border'>
        {award === 'editors_choice' ? (
          <Image
            src={'/images/editors-choice.png'}
            alt='Badge'
            width={125}
            height={57}
          />
        ) : award === 'top_pick' ? (
          <Image
            src={'/images/top-pick.png'}
            alt='Badge'
            width={125}
            height={57}
          />
        ) : award === 'best_buy' ? (
          <Image
            src={'/images/best-buy.png'}
            alt='Badge'
            width={125}
            height={57}
          />
        ) : (
          <></>
        )}
      </div>

      <div className={'p-2 h-14 border'}>
        <p className='text-sm text-sky-700 line-clamp-1'>{`$${
          sale_price ?? cta.price
        } ${cta.buttonText?.replace('View', '').trim()}`}</p>

        <Link
          href={`#${cta.productSlug}`}
          className={'text-sm underline hover:text-red-700'}
        >
          Jump to Details
        </Link>
      </div>
      <div className={'p-2 h-12 border'}>
        <div
          style={{ width: `${(totalScore / 60) * 100}%` }}
          className={classNames(
            'h-4 rounded mt-2',
            totalScore > 39
              ? 'bg-green-700'
              : totalScore > 19
              ? 'bg-yellow-400'
              : 'bg-red-700'
          )}
        >
          <p className='text-xs text-white text-right px-1'>{`${parseInt(
            totalScore
          )}`}</p>
        </div>
      </div>

      <div className={'p-2 h-32 sm:h-36 border'}>
        <p className={'text-xs sm:text-sm line-clamp-6'}>{description}</p>
      </div>

      <div className={'p-2 h-16 border'}>
        <Link
          href={`#${cta.productSlug}`}
          className={'text-sm text-red-700 hover:underline'}
        >
          {cta.title}
        </Link>
      </div>

      {[
        {
          attr: pageStats.acc,
          label: pageStats.showStats ? 'Accuracy' : 'Quality',
        },
        {
          attr: pageStats.erg,
          label: pageStats.showStats ? 'Ergonomics' : 'Durability',
        },
        { attr: pageStats.ftr, label: 'Features' },
        { attr: pageStats.fit, label: 'Fit & Finish' },
        {
          attr: pageStats.rel,
          label: pageStats.showStats ? 'Reliability' : 'Design',
        },
        { attr: pageStats.val, label: 'Value' },
      ].map((stat, index) => (
        <Stat key={index} {...stat} />
      ))}
    </div>
  )
}
