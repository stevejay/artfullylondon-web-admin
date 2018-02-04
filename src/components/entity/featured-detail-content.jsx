import React from 'react'
import PropTypes from 'prop-types'

import './featured-detail-content.scss'

class EntityFeaturedDetailContent extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return <p styleName='container' {...this.props} />
  }
}

EntityFeaturedDetailContent.propTypes = {
  children: PropTypes.any.isRequired
}

export default EntityFeaturedDetailContent
