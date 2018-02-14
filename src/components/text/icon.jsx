import React from 'react'
import PropTypes from 'prop-types'

import './icon.scss'

class TextIcon extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  // TODO find a solution for the className here:
  render () {
    const { icon } = this.props
    return icon ? React.createElement(icon, { className: 'text-icon' }) : null
  }
}

TextIcon.propTypes = {
  icon: PropTypes.func
}

export default TextIcon
