import HTMLContent from '@/components/atoms/HTMLContent'
import { faCheckCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export default function FeatureList({ listStyle, features }) {
  return (
    <div className={'grid md:grid-cols-2 gap-4 mb-8'}>
      {features?.map((feature, index) => (
        <div
          key={index}
          className={classNames(
            'flex flex-row gap-3',
            listStyle === 'red' && 'border border-zinc-300 p-5'
          )}
        >
          {listStyle === 'red' && (
            <div
              className={
                'w-16 h-16 rounded-full border-4 border-red-100 bg-gradient-to-r from-red-800 to-red-600 flex-shrink-0 flex flex-row justify-center items-center'
              }
            >
              <span className={'text-3xl font-bold font-display text-white'}>
                {index + 1}
              </span>
            </div>
          )}

          {listStyle === 'check' && (
            <FontAwesomeIcon icon={faCheckCircle} className={'py-2 w-5 h-5'} />
          )}

          {listStyle === 'ul' && <FontAwesomeIcon icon={faDotCircle} />}

          {listStyle === 'ol' && (
            <span className={'text-xl font-bold font-display'}>
              {`${index + 1}.`}
            </span>
          )}

          <div>
            <p className={'font-display text-2xl mb-1'}>{feature.title}</p>
            <HTMLContent>{feature.text}</HTMLContent>
          </div>
        </div>
      ))}
    </div>
  )
}
