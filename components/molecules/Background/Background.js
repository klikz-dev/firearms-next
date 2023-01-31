import PropTypes from 'prop-types'
import Image from '@/components/atoms/Image'

export default function Background({ image, alt, ...props }) {
  return (
    <div className={'absolute w-full h-full top-0 left-0 -z-10'}>
      {image && (
        <Image
          src={image}
          alt={alt}
          fill={true}
          className={'object-cover'}
          {...props}
        />
      )}
    </div>
  )
}

Background.propTypes = {
  image: PropTypes.string,
}
