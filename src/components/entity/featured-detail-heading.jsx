import React from 'react'
import PropTypes from 'prop-types'
import './featured-detail-heading.scss'

class EntityFeaturedDetailHeading extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return <h2 styleName='container' {...this.props} />
  }
}

EntityFeaturedDetailHeading.propTypes = {
  children: PropTypes.any.isRequired
}

export default EntityFeaturedDetailHeading
