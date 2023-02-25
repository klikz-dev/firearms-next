import { faChartColumn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

function Stat({ label, attr }) {
  return (
    <div className='mb-4'>
      <div className='flex flex-row justify-between mb-1'>
        <span className={'text-sm'}>{label}</span>
        <span className={'text-sm'}>{`${attr}/10`}</span>
      </div>

      <div className='bg-zinc-200 w-full h-2 rounded'>
        <div
          style={{ width: `${attr * 10}%` }}
          className={classNames(
            'h-full rounded',
            attr > 7
              ? 'bg-green-700'
              : attr > 5
              ? 'bg-yellow-400'
              : 'bg-red-700'
          )}
        ></div>
      </div>
    </div>
  )
}

export default function Stats({ pageStats }) {
  return (
    <div className='border border-zinc-200 rounded shadow mb-8'>
      <div className='px-3 py-2 bg-gradient-to-r from-red-800 to-red-600 text-white flex flex-row items-center gap-2'>
        <FontAwesomeIcon icon={faChartColumn} />
        <h6 className='font-sans'>Performance Scores</h6>
      </div>

      <div className='py-3 px-5'>
        {[
          { attr: pageStats.acc, label: 'Accuracy' },
          { attr: pageStats.erg, label: 'Ergonomics' },
          { attr: pageStats.ftr, label: 'Features' },
          { attr: pageStats.fit, label: 'Fit & Finish' },
          { attr: pageStats.rel, label: 'Reliability' },
          { attr: pageStats.val, label: 'Value' },
        ].map((stat, index) => (
          <Stat key={index} {...stat} />
        ))}
      </div>
    </div>
  )
}
