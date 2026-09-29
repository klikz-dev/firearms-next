import GradientBorder from '@/components/atoms/GradientBorder'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'

/**
 * Sticky desktop rail listing every product CTA on the page. Each card links
 * straight to the affiliate URL.
 */
export default function TopPicks({ picks = [] }) {
  if (!picks.length) return null

  return (
    <div
      className={'hidden lg:block lg:sticky overflow-y-auto pr-1'}
      style={{
        top: 'calc(var(--header-h, 0px) + var(--subnav-h, 0px) + 1.5rem)',
        maxHeight:
          'calc(100vh - var(--header-h, 0px) - var(--subnav-h, 0px) - 3rem)',
      }}
    >
      <div className={'flex flex-row items-center gap-3 mb-4'}>
        <GradientBorder height={2} className={'flex-grow'} />
        <h4 className={'shrink-0'}>Our Top Picks</h4>
        <GradientBorder height={2} className={'flex-grow'} />
      </div>

      {picks.map((pick) => (
        <Link
          key={pick.id}
          href={pick.link}
          className={
            'group block border border-zinc-300 bg-white mb-3 hover:border-red-700'
          }
        >
          <div className={'relative h-36 m-3 bg-white'}>
            <Image
              src={pick.image?.sourceUrl}
              alt={pick.image?.altText ?? pick.title}
              fill={true}
              sizes='300px'
              className={'object-contain'}
            />
          </div>

          <p
            className={
              'px-3 pb-3 text-center font-display font-semibold uppercase text-sm line-clamp-2 group-hover:text-red-700'
            }
          >
            {pick.title}
          </p>
        </Link>
      ))}
    </div>
  )
}
