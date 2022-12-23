/* eslint-disable jsx-a11y/alt-text */
import cn from 'classnames'
import Image from "next/legacy/image";
import { PropTypes } from 'prop-types'

export default function DisplayImage({
  src,
  width,
  height,
  alt,
  fill,
  cover,
  overlay,
  className,
}) {
  const sourceDomain = src?.includes('http') ? new URL(src) : undefined

  let domains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS

  domains = !domains || !domains.length ? [] : domains.split('|')

  function NextImage() {
    const imageProps = {
      alt: alt,
      src: src,
    }

    if (fill) {
      imageProps.layout = 'fill'
    } else {
      imageProps.height = height
      imageProps.width = width
    }

    return sourceDomain?.host ? (
      <Image
        {...imageProps}
        className={cn(
          fill ? (cover ? 'object-cover' : 'object-contain') : null
        )}
        placeholder='blur'
        blurDataURL='/images/blur.png'
      />
    ) : (
      <Image
        {...imageProps}
        className={cn(
          fill ? (cover ? 'object-cover' : 'object-contain') : null
        )}
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
        className={cn('flex items-center justify-center', className)}
      />
    )
  }

  if (!src) return <></>

  if (domains.includes(sourceDomain?.host) || !sourceDomain) {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <NextImage />

        {overlay && (
          <div
            className={
              'absolute top-0 left-0 w-full h-full bg-zinc-900 bg-opacity-60'
            }
          ></div>
        )}
      </div>
    )
  }

  return <HtmlImage />
}

DisplayImage.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
  fill: PropTypes.bool,
  cover: PropTypes.bool,
  overlay: PropTypes.bool,
  className: PropTypes.string,
}

DisplayImage.defaultProps = {
  fill: false,
  cover: false,
  overlay: false,
}
