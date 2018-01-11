import React from 'react'
import PropTypes from 'prop-types'
import './featured-detail-heading.scss'

class FeaturedDetailHeading extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return <h2 styleName='container' {...this.props} />
  }
}

FeaturedDetailHeading.propTypes = {
  children: PropTypes.any.isRequired
}

export default FeaturedDetailHeading
