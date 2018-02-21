import React from 'react'
import PropTypes from 'prop-types'

import './error.scss'

class Error extends React.PureComponent {
  render () {
    const { error } = this.props

    if (!error) {
      return null
    }

    const message = (error.join ? error.join('. ') : error) + '.'
    return <div styleName='container'>{message}</div>
  }
}

Error.propTypes = {
  error: PropTypes.any
}

export default Error