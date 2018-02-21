import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './icon.scss'

class TextIcon extends ShouldNeverUpdateComponent {
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
