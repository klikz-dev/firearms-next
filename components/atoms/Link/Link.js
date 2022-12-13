import NextLink from 'next/link'
import PropTypes from 'prop-types'

export default function TextLink({
  className,
  style,
  href,
  urlExternal,
  children,
  ...props
}) {
  return urlExternal || href.includes('recommends') || href.includes('http') ? (
    <a
      href={href}
      className={className}
      style={style}
      target='_blank'
      rel='noreferrer'
      {...props}
    >
      {children}
    </a>
  ) : (
    <NextLink href={href} className={className} style={style} {...props}>
      {children}
    </NextLink>
  )
}

TextLink.propTypes = {
  attributes: PropTypes.object,
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  urlExternal: PropTypes.bool,
  style: PropTypes.object,
}

TextLink.defaultProps = {
  disabled: false,
  urlExternal: false,
}
