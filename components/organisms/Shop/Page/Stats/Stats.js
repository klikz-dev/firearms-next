import { faChartColumn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

function Stat({ label, attr, small }) {
  return (
    <div className={classNames(small ? 'mb-2' : 'mb-4')}>
      <div
        className={classNames(
          'flex flex-row justify-between',
          !small && 'mb-1'
        )}
      >
        <span className={'text-sm'}>{label}</span>
        <span className={'text-sm'}>{`${attr}/10`}</span>
      </div>

      <div
        className={classNames(
          'bg-zinc-200 w-full rounded',
          small ? 'h-1.5' : 'h-2'
        )}
      >
        <div
          style={{ width: `${attr * 10}%` }}
          className={classNames(
            'h-full rounded',
            attr > 7
              ? 'bg-green-700'
              : attr > 4
              ? 'bg-yellow-400'
              : 'bg-red-700'
          )}
        ></div>
      </div>
    </div>
  )
}

export default function Stats({ pageStats, small = false, showTitle = true }) {
  return (
    <div
      className={classNames(
        !small && 'border border-zinc-200 rounded shadow mb-8'
      )}
    >
      {showTitle && (
        <div
          className={classNames(
            'px-3 py-2 flex flex-row items-center gap-2',
            !small && 'text-white bg-gradient-to-r from-red-800 to-red-600'
          )}
        >
          <FontAwesomeIcon icon={faChartColumn} />
          <h6 className='font-sans'>Performance Scores</h6>
        </div>
      )}

      <div
        className={classNames(
          small ? 'grid grid-cols-2 gap-x-4 px-3' : 'py-3 px-5'
        )}
      >
        {[
          {
            attr: pageStats.acc,
            label: pageStats.showStats ? 'Accuracy' : 'Quality',
          },
          {
            attr: pageStats.erg,
            label: pageStats.showStats ? 'Ergonomics' : 'Durability',
          },
          { attr: pageStats.ftr, label: 'Features' },
          { attr: pageStats.fit, label: 'Fit & Finish' },
          {
            attr: pageStats.rel,
            label: pageStats.showStats ? 'Reliability' : 'Design',
          },
          { attr: pageStats.val, label: 'Value' },
        ].map((stat, index) => (
          <Stat key={index} {...stat} small={small} />
        ))}
      </div>
    </div>
  )
}
