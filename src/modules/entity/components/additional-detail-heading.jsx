import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import './additional-detail-heading.scss'

class EntityAdditionalDetailHeading extends ShouldNeverUpdateComponent {
  render () {
    return <h2 styleName='container' {...this.props} />
  }
}

EntityAdditionalDetailHeading.propTypes = {
  children: PropTypes.any.isRequired
}

export default EntityAdditionalDetailHeading
