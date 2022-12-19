import classNames from 'classnames'

export default function Input({ value, setValue, className, ...props }) {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
      className={classNames(
        'px-4 py-1.5 placeholder:italic placeholder:text-black/50 text-black outline-none border-none ring-0 mt-1',
        className
      )}
    />
  )
}
