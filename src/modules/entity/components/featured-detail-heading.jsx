import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './featured-detail-heading.scss'

class EntityFeaturedDetailHeading extends ShouldNeverUpdateComponent {
  render () {
    return <h2 styleName='container' {...this.props} />
  }
}

EntityFeaturedDetailHeading.propTypes = {
  children: PropTypes.any.isRequired
}

export default EntityFeaturedDetailHeading
