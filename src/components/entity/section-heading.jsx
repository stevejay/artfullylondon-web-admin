import React from 'react'
import PropTypes from 'prop-types'
import './section-heading.m.scss'

class SectionHeading extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return <h2 styleName='heading'>{this.props.children}</h2>
  }
}

SectionHeading.propTypes = {
  children: PropTypes.any.isRequired
}

export default SectionHeading
