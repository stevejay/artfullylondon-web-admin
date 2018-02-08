import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import './featured-detail-content.scss'

class EntityFeaturedDetailContent extends ShouldNeverUpdateComponent {
  render () {
    return <p styleName='container' {...this.props} />
  }
}

EntityFeaturedDetailContent.propTypes = {
  children: PropTypes.any.isRequired
}

export default EntityFeaturedDetailContent
