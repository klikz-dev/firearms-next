import Link from '@/components/atoms/Link'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <div className='flex flex-wrap -mb-1 md:mb-6 border-b pb-2'>
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className='flex items-center'>
          {breadcrumb.link ? (
            <>
              {breadcrumb.icon || <></>}

              <Link href={breadcrumb.link}>{breadcrumb.text}</Link>

              <FontAwesomeIcon
                icon={faChevronRight}
                className={'text-sm w-6'}
              />
            </>
          ) : (
            <>
              {breadcrumb.icon || <></>}
              <span className='mx-1 font-bold text-sm md:text-base'>
                {breadcrumb.text}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
