import React from 'react'
import PropTypes from 'prop-types'

import './additional-detail-heading.scss'

class EntityAdditionalDetailHeading extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return <h2 styleName='container' {...this.props} />
  }
}

EntityAdditionalDetailHeading.propTypes = {
  children: PropTypes.any.isRequired
}

export default EntityAdditionalDetailHeading
