import GradientBorder from '@/components/atoms/GradientBorder'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export default function Title({
  topBorder,
  bottomBorder,
  className,
  children,
}) {
  return (
    <div className={classNames('inline-block mb-6', className)}>
      {topBorder && <GradientBorder height={1} />}

      {children}

      {bottomBorder && <GradientBorder height={1} />}
    </div>
  )
}

Title.propTypes = {
  topBorder: PropTypes.bool,
  bottomBorder: PropTypes.bool,
}

Title.defaultProps = {
  topBorder: true,
  bottomBorder: true,
}
