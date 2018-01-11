import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from 'react-icons/lib/fa/close'
import './reset-button.scss'

class ResetButton extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.disabled !== this.props.disabled
  }
  render () {
    return (
      <button
        styleName='button'
        type='button'
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        <span styleName='content-wrapper'>
          <CloseIcon styleName='icon' />
        </span>
      </button>
    )
  }
}

ResetButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default ResetButton
