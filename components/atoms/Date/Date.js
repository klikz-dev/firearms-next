import { faClock } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import moment from 'moment'

export default function Date({ date, className }) {
  return (
    <div
      className={classNames(
        'flex flex-row items-center gap-2 text-sm mb-2',
        className
      )}
    >
      <FontAwesomeIcon icon={faClock} />
      <p className={'text-sm'}>{moment(date).format('MMMM DD, YYYY')}</p>
    </div>
  )
}
