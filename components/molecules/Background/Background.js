import PropTypes from 'prop-types'
import Image from '@/components/atoms/Image'

export default function Background({ image, alt }) {
  const renderHTTPImage = (image) => {
    if (image?.startsWith('//')) {
      return `https:${image}`
    } else {
      return image
    }
  }

  return (
    <div className={'absolute w-full h-full top-0 left-0 -z-10'}>
      {image && (
        <Image
          src={renderHTTPImage(image)}
          alt={alt}
          fill={true}
          cover={true}
        />
      )}
    </div>
  )
}

Background.propTypes = {
  image: PropTypes.string,
}
