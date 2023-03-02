import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import { otherSellers } from '@/const/setting/sellers'
import classNames from 'classnames'

export default function OtherSellers({ buttonText, search }) {
  const sellers = otherSellers.filter((seller) => {
    return !seller.brand?.includes(
      buttonText?.toLowerCase()?.replace('view at', '').trim()
    )
  })

  return (
    <div className={'flex flex-col lg:flex-row lg:items-center lg:gap-8 p-4'}>
      <h4 className='text-center'>Other Sellers:</h4>

      <div
        className={classNames(
          'flex-grow grid lg:gap-8',
          sellers?.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
        )}
      >
        {sellers?.map((seller) => (
          <div
            key={seller.brand}
            className={'cols-span-1 flex flex-row justify-center'}
          >
            <Link
              href={`${seller.baseURL}${search}`}
              className={'block relative col-span-1 w-40 h-16'}
            >
              <Image
                src={seller.image}
                fill={true}
                alt={seller.brand}
                className={'object-contain'}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
