import Image from 'next/image'

export default function DisplayImage({
  src,
  width,
  height,
  alt,
  className,
  style,
  ...props
}) {
  if (!src) {
    return <></>
  }

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt ?? 'Image'}
      className={className}
      style={style}
      {...props}
    />
  )
}
