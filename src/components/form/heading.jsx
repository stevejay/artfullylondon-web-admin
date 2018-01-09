import React from 'react'
import PropTypes from 'prop-types'
import './heading.m.scss'

class FormHeading extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { children, ...rest } = this.props
    return <h2 {...rest} styleName='heading'>{children}</h2>
  }
}

FormHeading.propTypes = {
  children: PropTypes.any.isRequired
}

export default FormHeading
