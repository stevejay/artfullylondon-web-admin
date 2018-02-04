import React from 'react'
import PropTypes from 'prop-types'

import './section-heading.scss'

class EntitySectionHeading extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return <h2 styleName='heading'>{this.props.children}</h2>
  }
}

EntitySectionHeading.propTypes = {
  children: PropTypes.any.isRequired
}

export default EntitySectionHeading
