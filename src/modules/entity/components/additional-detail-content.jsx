import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './additional-detail-content.scss'

class EntityAdditionalDetailContent extends ShouldNeverUpdateComponent {
  render () {
    return <p styleName='container' {...this.props} />
  }
}

EntityAdditionalDetailContent.propTypes = {
  children: PropTypes.any.isRequired
}

export default EntityAdditionalDetailContent
