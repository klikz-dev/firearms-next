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
      {topBorder && <GradientBorder height={2} />}

      <div className={'py-1.5'}>{children}</div>

      {bottomBorder && <GradientBorder height={2} />}
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
