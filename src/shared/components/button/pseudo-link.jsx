import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import * as globalConstants from '_src/shared/constants'
import './pseudo-link.scss'

class PseudoLink extends ShouldNeverUpdateComponent {
  handleClick = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onClick()
  }
  handleKeyPress = event => {
    if (event.charCode === globalConstants.ENTER_CHARCODE) {
      this.props.onClick()
    }
  }
  render () {
    const { children } = this.props

    return (
      <button
        type='button'
        styleName='link'
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
      >
        {children}
      </button>
    )
  }
}

PseudoLink.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired
}

export default PseudoLink
