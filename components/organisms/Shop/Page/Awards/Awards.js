import Link from '@/components/atoms/Link'
import toCapitalize from '@/functions/toCapitalize'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'

export default function Awards({ page, brandRank, categoryRank }) {
  const year = moment().format('YYYY')

  return (
    <>
      {(brandRank > 0 || categoryRank > 0) && (
        <div className='border border-zinc-200 rounded shadow mb-8'>
          <div className='px-3 py-2 bg-yellow-600 text-white font-bold capitalize'>
            {year} Awards & rankings
          </div>

          <div className='py-3 px-5'>
            {brandRank ? (
              <div className='flex flex-row items-start mb-2'>
                <FontAwesomeIcon icon={faTrophy} className='text-yellow-600' />

                <Link
                  href={`/shop/brands/popular/${page.brand.slug}`}
                  className='ml-2 text-sm font-bold hover:underline'
                >
                  #{brandRank} Most Popular {toCapitalize(page.brand.name)}{' '}
                  {toCapitalize(page.category.name)}
                </Link>
              </div>
            ) : (
              <></>
            )}

            {categoryRank ? (
              <div className='flex flex-row items-start'>
                <FontAwesomeIcon icon={faTrophy} className='text-yellow-600' />

                <Link
                  href={`/shop/categories/popular/${page.category.slug}`}
                  className='ml-2 text-sm font-bold hover:underline'
                >
                  #{categoryRank} Most Popular{' '}
                  {toCapitalize(page.category.name)}
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  )
}
