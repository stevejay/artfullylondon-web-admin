import React from 'react'
import PropTypes from 'prop-types'
import './pseudo-link.m.scss'

class PseudoLink extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  handleClick = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onClick()
  }
  handleKeyPress = event => {
    const { onClick } = this.props

    if (event.key === 'Enter') {
      onClick && onClick()
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
