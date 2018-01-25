import React from 'react'
import PropTypes from 'prop-types'

import './button.scss'

// Note: Must be a class as a ref is taken of this component.
class DropdownButton extends React.Component {
  render () {
    const {
      label,
      compact,
      dropdownIsOpen,
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
        styleName={`button${compact ? '-compact' : ''}${dropdownIsOpen ? '-open' : ''}`}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-haspopup={!!ariaHaspopup}
      >
        {label}{dropdownIsOpen ? '\u00a0\u25BE' : '\u00a0\u25BE'}
      </button>
    )
  }
}

DropdownButton.propTypes = {
  label: PropTypes.string.isRequired,
  compact: PropTypes.bool,
  dropdownIsOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  ariaHaspopup: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
}

export default DropdownButton
