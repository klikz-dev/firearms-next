export default function GradientBorder({ height }) {
  return (
    <div
      className={`bg-gradient-to-r from-red-800 to-red-400`}
      style={{ height: `${height}px` }}
    />
  )
}
