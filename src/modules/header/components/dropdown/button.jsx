import React from 'react'
import PropTypes from 'prop-types'

import './button.scss'

// Note: Must be a class as ref is taken of this component.
class DropdownButton extends React.Component {
  render () {
    const {
      label,
      onClick,
      onKeyDown,
      onKeyPress,
      onFocus,
      onBlur,
      ariaHaspopup,
      ...rest
    } = this.props

    return (
      <button
        {...rest}
        type='button'
        styleName='button'
        onClick={onClick}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
        onBlur={onBlur}
        role='menuitem'
        aria-haspopup={!!ariaHaspopup}
      >
        {label}
      </button>
    )
  }
}

/* istanbul ignore next */
DropdownButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  ariaHaspopup: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
}

export default DropdownButton
