import React from 'react'
import PropTypes from 'prop-types'

import * as browserConstants from '_src/constants/browser'
import './icon.scss'

const BUTTON_TYPE_INVERSE = 'inverse'
const BUTTON_TYPE_DEFAULT = 'default'

class IconButton extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.ariaExpanded !== this.props.ariaExpanded
  }
  handleClick = event => {
    event.preventDefault()
    this.props.onClick(event)
  }
  handleKeyPress = event => {
    if (event.charCode === browserConstants.ENTER_CHARCODE) {
      this.props.onClick()
    }
  }
  render () {
    const {
      onClick, // eslint-disable-line no-unused-vars
      type,
      icon,
      ariaExpanded,
      className,
      ...rest
    } = this.props

    return (
      <button
        {...rest}
        type='button'
        styleName={'link-' + type}
        className={className}
        tabIndex={0}
        onKeyPress={this.handleKeyPress}
        onClick={this.handleClick}
        aria-expanded={ariaExpanded}
      >
        {React.createElement(icon)}
      </button>
    )
  }
}

IconButton.propTypes = {
  type: PropTypes.oneOf([BUTTON_TYPE_DEFAULT, BUTTON_TYPE_INVERSE]),
  icon: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  ariaExpanded: PropTypes.bool,
  className: PropTypes.string
}

IconButton.defaultProps = {
  type: BUTTON_TYPE_DEFAULT
}

export default IconButton
