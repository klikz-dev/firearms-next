import classNames from 'classnames'
import styles from './RangeSlider.module.scss'

const RangeSlider = ({
  name,
  min = 0,
  max = 10,
  step = 1,
  value,
  setValue,
}) => {
  return (
    <div className={'relative'}>
      <div className={'flex flex-row justify-between'}>
        <span className={'text-sm'}>{name}</span>
        <span className={'text-sm'}>{`${value} / 10`}</span>
      </div>

      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className={classNames(
          styles.input,
          value > 7
            ? styles[`green-${value}`]
            : value > 4
            ? styles[`yellow-${value}`]
            : styles[`red-${value}`]
        )}
      />
    </div>
  )
}

export default RangeSlider
