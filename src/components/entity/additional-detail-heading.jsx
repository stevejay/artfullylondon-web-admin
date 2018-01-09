import React from 'react'
import PropTypes from 'prop-types'
import './additional-detail-heading.m.scss'

class AdditionalDetailHeading extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return <h2 styleName='container' {...this.props} />
  }
}

AdditionalDetailHeading.propTypes = {
  children: PropTypes.any.isRequired
}

export default AdditionalDetailHeading
