import classNames from 'classnames'

export default function Input({ value, setValue, className, ...props }) {
  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
        className={classNames(
          'px-5 py-1.5 placeholder:italic text-black outline-none border-none ring-0',
          className
        )}
      />
    </div>
  )
}
