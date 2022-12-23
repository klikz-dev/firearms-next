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
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
      {...props}
    />
  )
}
