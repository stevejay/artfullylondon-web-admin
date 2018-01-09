import React from 'react'
import PropTypes from 'prop-types'
import './sub-heading.m.scss'

class SubHeading extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { children, ...rest } = this.props
    return <h4 {...rest} styleName='sub-heading'>{children}</h4>
  }
}

SubHeading.propTypes = {
  children: PropTypes.any.isRequired
}

export default SubHeading
