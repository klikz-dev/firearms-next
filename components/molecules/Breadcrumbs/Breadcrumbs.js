import Link from '@/components/atoms/Link'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <div className='flex flex-wrap mb-3 md:mb-6 border-b pb-2'>
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className='flex items-center'>
          {breadcrumb.link ? (
            <>
              <Link href={breadcrumb.link} className={'hover:underline'}>
                {breadcrumb.text}
              </Link>

              <FontAwesomeIcon
                icon={faChevronRight}
                className={'text-sm w-6'}
              />
            </>
          ) : (
            <>
              <span className='mx-1 text-sm md:text-base font-display'>
                {breadcrumb.text}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
