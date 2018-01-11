import React from 'react'
import PropTypes from 'prop-types'
import './additional-detail-content.scss'

class AdditionalDetailContent extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return <p styleName='container' {...this.props} />
  }
}

AdditionalDetailContent.propTypes = {
  children: PropTypes.any.isRequired
}

export default AdditionalDetailContent
