import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Rating({ rating }) {
  return (
    <div className='w-24 p-0 relative text-blue-gray-100'>
      <div className='w-full p-0 block z-0'>
        <div className='flex justify-between w-24'>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
      </div>

      <div
        className='overflow-hidden absolute top-0 left-0 block p-0 text-blue-gray-800'
        style={{ width: `${rating * 20}%` }}
      >
        <div className='flex justify-between w-24'>
          <FontAwesomeIcon icon={faStar} className={'text-yellow-400'} />
          <FontAwesomeIcon icon={faStar} className={'text-yellow-400'} />
          <FontAwesomeIcon icon={faStar} className={'text-yellow-400'} />
          <FontAwesomeIcon icon={faStar} className={'text-yellow-400'} />
          <FontAwesomeIcon icon={faStar} className={'text-yellow-400'} />
        </div>
      </div>
    </div>
  )
}
