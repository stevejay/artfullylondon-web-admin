import React from 'react'
import PropTypes from 'prop-types'
import './featured-detail-content.m.scss'

class FeaturedDetailContent extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return <p styleName='container' {...this.props} />
  }
}

FeaturedDetailContent.propTypes = {
  children: PropTypes.any.isRequired
}

export default FeaturedDetailContent
