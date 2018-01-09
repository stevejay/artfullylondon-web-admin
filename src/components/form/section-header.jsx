import React from 'react'
import PropTypes from 'prop-types'
import './section-header.m.scss'

class FormSectionHeader extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return <h2 styleName='h2'>{this.props.children}</h2>
  }
}

FormSectionHeader.propTypes = {
  children: PropTypes.any.isRequired
}

export default FormSectionHeader
