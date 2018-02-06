import React from 'react'
import PropTypes from 'prop-types'

import './button.scss'

const SidenavButton = ({
  children,
  onClick,
  onKeyDown,
  onKeyPress,
  onFocus,
  onBlur,
  ariaHaspopup,
  ...rest
}) => (
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
    aria-haspopup={ariaHaspopup}
  >
    {children}
  </button>
)

SidenavButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  ariaHaspopup: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
}

SidenavButton.defaultProps = {
  ariaHaspopup: false
}

export default SidenavButton
