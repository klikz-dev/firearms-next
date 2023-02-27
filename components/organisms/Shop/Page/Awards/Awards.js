import Link from '@/components/atoms/Link'
import toCapitalize from '@/functions/toCapitalize'
import { faTrophy, faAward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import moment from 'moment'

export default function Awards({ page, brandRank, categoryRank, small }) {
  const year = moment().format('YYYY')

  return (
    <>
      {(brandRank > 0 || categoryRank > 0) && (
        <div
          className={classNames(
            !small && 'border border-zinc-200 rounded shadow mb-8'
          )}
        >
          <div
            className={classNames(
              'px-3 py-2 flex flex-row items-center gap-2',
              !small && 'text-white bg-gradient-to-r from-zinc-800 to-zinc-600'
            )}
          >
            <FontAwesomeIcon icon={faAward} />
            <h6 className='font-sans'>{year} Awards & Rankings</h6>
          </div>

          <div className={classNames(small ? 'px-2.5 py-2' : 'py-3 px-5')}>
            {brandRank ? (
              <div className='flex flex-row items-center mb-2'>
                <FontAwesomeIcon icon={faTrophy} className='text-yellow-600' />

                <Link
                  href={`/shop/brands/popular/${page.brand.slug}`}
                  className='ml-2 text-sm font-sans font-medium hover:text-red-700'
                >
                  #{brandRank} Most Popular {toCapitalize(page.brand.name)}{' '}
                  {toCapitalize(page.category.name)}
                </Link>
              </div>
            ) : (
              <></>
            )}

            {categoryRank ? (
              <div className='flex flex-row items-center'>
                <FontAwesomeIcon icon={faTrophy} className='text-yellow-600' />

                <Link
                  href={`/shop/categories/popular/${page.category.slug}`}
                  className='ml-2 text-sm font-sans font-medium hover:text-red-700'
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
