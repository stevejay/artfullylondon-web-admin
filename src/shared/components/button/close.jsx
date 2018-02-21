import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from 'react-icons/lib/fa/close'

import IconButton from './icon'
import './close.scss'

const BUTTON_TYPE_ERROR = 'error'
const BUTTON_TYPE_DEFAULT = 'default'
const BUTTON_TYPE_SUCCESS = 'success'

const CloseButton = ({ type, ariaLabel, onClick }) => (
  <IconButton
    styleName={`close-button-${type}`}
    type={type === BUTTON_TYPE_DEFAULT ? 'default' : 'inverse'}
    icon={CloseIcon}
    onClick={onClick}
    aria-label={ariaLabel}
  />
)

CloseButton.propTypes = {
  type: PropTypes.oneOf([
    BUTTON_TYPE_ERROR,
    BUTTON_TYPE_DEFAULT,
    BUTTON_TYPE_SUCCESS
  ]),
  ariaLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

CloseButton.defaultProps = {
  type: BUTTON_TYPE_DEFAULT
}

export default CloseButton
