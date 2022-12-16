import NextLink from 'next/link'
import PropTypes from 'prop-types'

export default function TextLink({
  href,
  urlExternal,
  className,
  children,
  ...props
}) {
  return urlExternal || href.includes('recommends') || href.includes('http') ? (
    <a
      href={href}
      className={className}
      target='_blank'
      rel='noreferrer'
      {...props}
    >
      {children}
    </a>
  ) : (
    <NextLink href={href} className={className} {...props}>
      {children}
    </NextLink>
  )
}

TextLink.propTypes = {
  href: PropTypes.string.isRequired,
  urlExternal: PropTypes.bool,
  className: PropTypes.string,
  props: PropTypes.object,
}

TextLink.defaultProps = {
  urlExternal: false,
}
