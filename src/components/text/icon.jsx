import React from 'react'
import PropTypes from 'prop-types'
import './icon.m.scss'

class TextIcon extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { icon } = this.props
    return icon ? React.createElement(icon, { styleName: 'icon' }) : null
  }
}

TextIcon.propTypes = {
  icon: PropTypes.func
}

export default TextIcon
