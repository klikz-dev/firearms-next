import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PopularCategory({ pages }) {
  return (
    <>
      <table className='table-auto mx-auto relative w-full'>
        <thead className='bg-white sticky w-full top-0 z-10 shadow hidden lg:table-header-group'>
          <tr>
            <th>Rank</th>
            <th></th>
            <th></th>
            <th className='hidden lg:table-cell'>Condition</th>
            <th className='p-4 w-40 text-center  hidden lg:table-cell'>
              Previous Rank
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {pages.map((page, index) => (
            <tr key={index}>
              <td className='font-bold lg:px-2 text-center w-12 lg:w-24'>
                <div className='flex justify-center items-end'>
                  <div className='w-6 h-6 rounded-full bg-blue-500 text-white inline-flex justify-center items-center text-xs mr-3'>
                    {index + 1}
                  </div>

                  {index + 1 < page.pre_category_rank && (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}

                  {index + 1 > page.pre_category_rank && (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}
                </div>
              </td>

              <td className='lg:px-6 lg:py-4'>
                <div className='relative w-16 h-16 lg:w-32 lg:h-32'>
                  <Image src={page.thumb_url} fill={true} alt={page.title} />
                </div>
              </td>

              <td className='px-2 lg:px-4 text-sm lg:text-base font-bold capitalize'>
                {page.title.toLowerCase()}
              </td>

              <td className='px-4 text-center hidden lg:table-cell'>New</td>

              <td className='px-4 text-center hidden lg:table-cell'>
                {page.pre_category_rank}
              </td>

              <td className='text-sm lg:text-base lg:w-40 py-4'>
                <Button
                  href={`/shop/${page.slug}/`}
                  text='View Prices'
                  type='secondary'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
