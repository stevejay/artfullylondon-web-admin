import React from 'react'
import PropTypes from 'prop-types'

import './we-say.scss'

class WeSay extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { children } = this.props

    if (!children) {
      return null
    }

    return (
      <p styleName='container'>
        <span styleName='label'>We say:</span><br />
        <span styleName='text'>“{children}”</span>
      </p>
    )
  }
}

WeSay.propTypes = {
  children: PropTypes.any
}

export default WeSay
