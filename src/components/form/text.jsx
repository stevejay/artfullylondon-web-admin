import React from 'react'
import PropTypes from 'prop-types'

import './text.scss'

class FormText extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { children, ...rest } = this.props
    return <div {...rest} styleName='container'>{children}</div>
  }
}

FormText.propTypes = {
  children: PropTypes.any
}

export default FormText
