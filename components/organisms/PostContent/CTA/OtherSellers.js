import { Fragment } from 'react'
import Link from '@/components/atoms/Link'
import { otherSellers } from '@/const/setting/sellers'

export default function OtherSellers({ buttonText, search }) {
  const sellers = otherSellers.filter((seller) => {
    return !seller.brand?.includes(
      buttonText?.toLowerCase()?.replace('view at', '').trim()
    )
  })

  if (!sellers.length) return null

  return (
    <div
      className={
        'flex flex-row flex-wrap items-center gap-x-2 gap-y-1 px-4 pb-4 text-sm'
      }
    >
      <span
        className={
          'font-display uppercase text-xs tracking-wider text-zinc-500'
        }
      >
        Other sellers:
      </span>

      {sellers.map((seller, index) => (
        <Fragment key={seller.brand}>
          {index > 0 && <span className={'text-zinc-400'}>&middot;</span>}
          <Link
            href={`${seller.baseURL}${search}`}
            className={'text-red-700 hover:underline'}
          >
            {seller.name}
          </Link>
        </Fragment>
      ))}
    </div>
  )
}
