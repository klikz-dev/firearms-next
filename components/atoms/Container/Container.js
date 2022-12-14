import classNames from 'classnames'

export default function Container({ children, className }) {
  return (
    <div className={classNames('max-w-7xl mx-auto px-2', className)}>
      {children}
    </div>
  )
}
