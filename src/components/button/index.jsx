import React from 'react'
import PropTypes from 'prop-types'
import Loader from '_src/components/loader'
import './index.scss'

class Button extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.disabled !== this.props.disabled ||
      nextProps.submitting !== this.props.submitting
    )
  }
  render () {
    const {
      children,
      disabled,
      submitting,
      onClick,
      type,
      ariaLabel,
      className,
      ...rest
    } = this.props

    const buttonStyle = submitting
      ? 'submitting'
      : disabled ? 'disabled' : 'default'

    return (
      <button
        {...rest}
        type={type}
        disabled={disabled}
        className={className}
        styleName={buttonStyle}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <span styleName='content'>{children}</span>
        {submitting && <Loader size='medium' type='inverse' />}
      </button>
    )
  }
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  submitting: PropTypes.bool,
  ariaLabel: PropTypes.string,
  className: PropTypes.string
}

Button.defaultProps = {
  type: 'button'
}

export default Button
