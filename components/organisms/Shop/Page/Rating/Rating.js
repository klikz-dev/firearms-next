import { useState } from 'react'
import toCapitalize from '@/functions/toCapitalize'
import cn from 'classnames'
import Link from '@/components/atoms/Link'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGun } from '@fortawesome/free-solid-svg-icons'
import getBulkStats from '@/functions/getBulkStats'

export default function Rating({ page, brandPages, categoryPages }) {
  brandPages = getBulkStats(brandPages)
  categoryPages = getBulkStats(categoryPages)

  const month = moment().format('MMMM')

  const [rankTab, setRankTab] = useState('category')

  const RatingList = ({ pages }) => {
    return pages.slice(0, 20).map((page, index) => {
      return (
        <div key={index} className='flex flex-row items-center mb-1'>
          <div className='flex-shrink-0 w-6 h-6 flex justify-center items-center bg-green-700 text-white text-sm rounded-full mr-2'>
            <span>{`${page.statScore}`}</span>
          </div>

          <Link
            href={`/shop/${page.slug}/`}
            className='text-sm font-medium hover:text-red-700'
          >
            {`${toCapitalize(page.title)}`}
          </Link>
        </div>
      )
    })
  }

  return (
    <div className='border border-zinc-200 rounded shadow mb-8'>
      <div className='px-3 py-2 bg-gradient-to-r from-red-800 to-red-600 text-white flex flex-row items-center gap-2'>
        <FontAwesomeIcon icon={faGun} />
        <h6 className='font-sans'>
          {month} {toCapitalize(page.category.name)} Rating
        </h6>
      </div>

      <div className='mb-3 flex flex-row'>
        <div
          className={cn(
            'w-1/2 text-xs font-medium text-center px-2 py-2 rounded-t cursor-pointer border-b-2',
            rankTab === 'category'
              ? 'bg-zinc-100 border-red-500'
              : 'border-zinc-300'
          )}
          onClick={() => setRankTab('category')}
        >
          <span>All {page.category.name}</span>
        </div>

        <div
          className={cn(
            'w-1/2 text-xs font-medium text-center px-2 py-2 rounded-t cursor-pointer border-b-2',
            rankTab === 'brand'
              ? 'bg-zinc-100 border-red-500'
              : 'border-zinc-300'
          )}
          onClick={() => setRankTab('brand')}
        >
          <span>
            {page.brand.name} {page.category.name}
          </span>
        </div>
      </div>

      <div className='py-3 px-5'>
        {rankTab === 'category' ? (
          <RatingList pages={categoryPages} />
        ) : (
          <RatingList pages={brandPages} />
        )}
      </div>
    </div>
  )
}
