import classNames from 'classnames'

export default function GradientBorder({ height, className }) {
  return (
    <div
      className={classNames(
        `bg-gradient-to-r from-red-800 to-red-400`,
        className
      )}
      style={{ height: `${height}px` }}
    />
  )
}
