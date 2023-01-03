import { useState } from 'react'
import toCapitalize from '@/functions/toCapitalize'
import cn from 'classnames'
import Link from '@/components/atoms/Link'
import moment from 'moment'

export default function Ranking({ page, brandPages, categoryPages }) {
  const month = moment().format('MMMM')

  const [rankTab, setRankTab] = useState('category')

  return (
    <div className='border border-zinc-100 rounded shadow mb-8'>
      <div className='px-3 py-2 bg-dark text-white font-bold'>
        {month} {toCapitalize(page.category.name)} Ranking
      </div>

      <div className='py-3 px-5'>
        <div className='border-b border-zinc-300 mb-3 flex flex-row justify-start'>
          <div
            className={cn(
              'text-xs font-bold px-2 py-1 rounded-t cursor-pointer mr-1',
              rankTab === 'category'
                ? 'text-white bg-zinc-700'
                : 'text-black bg-zinc-200'
            )}
            onClick={() => setRankTab('category')}
          >
            All {page.category.name}
          </div>

          <div
            className={cn(
              'text-xs font-bold px-2 py-1 rounded-t cursor-pointer',
              rankTab === 'brand'
                ? 'text-white bg-zinc-700'
                : 'text-black bg-zinc-200'
            )}
            onClick={() => setRankTab('brand')}
          >
            {page.brand.name} {page.category.name}
          </div>
        </div>

        {rankTab === 'category' ? (
          <>
            {categoryPages.slice(0, 20).map((page, index) => (
              <div key={index} className='flex flex-row items-start mb-1'>
                <span className='w-8 text-center flex-shrink-0 bg-zinc-700 text-white text-xs font-bold rounded mr-2'>
                  #{index + 1}
                </span>

                <Link
                  href={`/shop/${page.slug}/`}
                  className='text-xs font-semibold hover:text-red-700'
                >
                  {toCapitalize(page.title)}
                  {page.pre_category_rank !== index + 1 && (
                    <>
                      {' '}
                      (
                      {page.pre_category_rank - index - 1 > 0
                        ? `+${page.pre_category_rank - index - 1}`
                        : `${page.pre_category_rank - index - 1}`}
                      )
                    </>
                  )}
                </Link>
              </div>
            ))}
          </>
        ) : (
          <>
            {brandPages.slice(0, 20).map((page, index) => (
              <div key={index} className='flex flex-row items-start mb-1'>
                <span className='w-8 text-center flex-shrink-0 bg-zinc-700 text-white text-xs font-bold rounded mr-2'>
                  #{index + 1}
                </span>

                <Link
                  href={`/shop/${page.slug}/`}
                  className='text-xs font-semibold hover:text-red-700'
                >
                  {toCapitalize(page.title)}
                  {page.pre_brand_rank !== index + 1 && (
                    <>
                      {' '}
                      (
                      {page.pre_brand_rank - index - 1 > 0
                        ? `+${page.pre_brand_rank - index - 1}`
                        : `${page.pre_brand_rank - index - 1}`}
                      )
                    </>
                  )}
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
