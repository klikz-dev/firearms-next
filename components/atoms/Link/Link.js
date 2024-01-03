// import NextLink from 'next/link'
import React from 'react'
import PropTypes from 'prop-types'

export default function TextLink({
  href,
  urlExternal,
  className,
  children,
  ...props
}) {
  if (!href) {
    return <div className={className}>{children}</div>
  }

  function getTextFromReactChildren(children) {
    let text = ''
    React.Children.forEach(children, (child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        text += child.toString()
      } else if (React.isValidElement(child) && child.props.children) {
        text += getTextFromReactChildren(child.props.children)
      }
    })
    return text
  }

  return urlExternal || href.includes('recommends') || href.includes('http') ? (
    <a
      href={href}
      className={className}
      target='_blank'
      rel='noreferrer'
      {...props}
      aria-label={getTextFromReactChildren(children)}
    >
      {children}
    </a>
  ) : (
    <a
      href={href}
      className={className}
      {...props}
      aria-label={getTextFromReactChildren(children)}
    >
      {children}
    </a>
  )
}

TextLink.propTypes = {
  href: PropTypes.string,
  urlExternal: PropTypes.bool,
  className: PropTypes.string,
  props: PropTypes.object,
}

TextLink.defaultProps = {
  urlExternal: false,
}
