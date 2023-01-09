import classNames from 'classnames'

export default function Container({ children, className, ...props }) {
  return (
    <div
      className={classNames('max-w-7xl mx-auto px-4 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  )
}
