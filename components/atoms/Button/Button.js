import React from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './Button.module.scss'

export default function Button({
  color,
  size,
  href,
  urlExternal,
  onClick,
  className,
  disabled,
  children,
  ...props
}) {
  const buttonClassNames = cn(
    styles.button,
    styles[color],
    styles[size],
    disabled && styles.disabled,
    className
  )

  if (href) {
    return urlExternal || href.includes('recommends') ? (
      <a
        href={href}
        className={buttonClassNames}
        target='_blank'
        rel='noreferrer'
        {...props}
      >
        {children}
      </a>
    ) : (
      <NextLink href={href} className={buttonClassNames} {...props}>
        {children}
      </NextLink>
    )
  } else {
    return React.createElement(
      `button`,
      {
        className: buttonClassNames,
        onClick,
        disabled,
        ...props,
      },
      <span>{children}</span>
    )
  }
}

Button.propTypes = {
  color: PropTypes.oneOf(['black', 'red']),
  disabled: PropTypes.bool,
  href: PropTypes.string,
  urlExternal: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'full']),
}

Button.defaultProps = {
  color: 'black',
  size: 'md',
  disabled: false,
  urlExternal: false,
}
