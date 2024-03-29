import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Button.module.scss'

export default function Button({
  color,
  size,
  onClick,
  disabled,
  className,
  children,
  style,
  ...props
}) {
  const buttonClassNames = classNames(
    styles.button,
    styles[color],
    styles[size],
    disabled && styles.disabled,
    className
  )

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

  return (
    <button
      className={buttonClassNames}
      onClick={onClick}
      disabled={disabled}
      style={style}
      {...props}
      aria-label={getTextFromReactChildren(children)}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  color: PropTypes.oneOf(['black', 'red', 'yellow', 'white']),
  size: PropTypes.oneOf(['icon', 'sm', 'md', 'lg', 'full']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  props: PropTypes.object,
}

Button.defaultProps = {
  color: 'black',
  size: 'md',
  disabled: false,
}
