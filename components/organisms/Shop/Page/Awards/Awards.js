import Image from '@/components/atoms/Image'
import toCapitalize from '@/functions/toCapitalize'
import dateFormat from 'dateformat'

export default function Awards({ page, brandRank, categoryRank }) {
  const year = dateFormat(new Date(), 'yyyy')

  return (
    <>
      {(brandRank > 0 || categoryRank > 0) && (
        <div className='border border-zinc-100 rounded shadow mb-8'>
          <div className='px-3 py-2 bg-yellow-600 text-white font-bold capitalize'>
            {year} Awards & rankings
          </div>

          <div className='py-3 px-5'>
            {brandRank ? (
              <div className='flex flex-row items-start mb-2'>
                <Image
                  src='/icons/trophy-solid.svg'
                  width={20}
                  height={20}
                  className='yellow-600'
                />

                <span className='ml-2 text-sm font-bold'>
                  #{brandRank} Most Popular {toCapitalize(page.brand.name)}{' '}
                  {toCapitalize(page.category.name)}
                </span>
              </div>
            ) : (
              <></>
            )}

            {categoryRank ? (
              <div className='flex flex-row items-start'>
                <Image
                  src='/icons/trophy-solid.svg'
                  width={20}
                  height={20}
                  className='yellow-600'
                />

                <span className='ml-2 text-sm font-bold'>
                  #{categoryRank} Most Popular{' '}
                  {toCapitalize(page.category.name)}
                </span>
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
