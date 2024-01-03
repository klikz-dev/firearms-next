export default function Input({ value, setValue, className, ...props }) {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
      className={className}
    />
  )
}
