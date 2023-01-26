import Link from '@/components/atoms/Link'
import { socialIcons } from '@/const/setting/social'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export default function Social({ className }) {
  return (
    <div
      className={classNames('flex flex-row gap-2 w-80 max-w-full', className)}
    >
      {socialIcons.map((social, index) => (
        <Link
          key={index}
          href={social.link}
          className={
            'w-8 h-8 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
          }
        >
          <FontAwesomeIcon icon={social.icon} className={'text-red-700'} />
        </Link>
      ))}
    </div>
  )
}
