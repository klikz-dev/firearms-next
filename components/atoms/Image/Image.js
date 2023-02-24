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
  const sourceDomain = src?.includes('http') ? new URL(src) : undefined
  let domains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS
  domains = !domains || !domains.length ? [] : domains.split('|')

  function NextImage() {
    return sourceDomain?.host ? (
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt ?? 'Image'}
        className={className}
        style={style}
        {...props}
      />
    ) : (
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt ?? 'Image'}
        className={className}
        style={{ height: 'auto' }}
        {...props}
      />
    )
  }

  function HtmlImage() {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        width='100%'
        height='auto'
        alt={alt}
        className={className}
      />
    )
  }

  if (domains.includes(sourceDomain?.host) || !sourceDomain) {
    return <NextImage />
  } else {
    return <HtmlImage />
  }
}
