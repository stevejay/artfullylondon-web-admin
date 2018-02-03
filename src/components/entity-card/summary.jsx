import React from 'react'
import PropTypes from 'prop-types'

import './summary.scss'

class Summary extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { children, ...rest } = this.props
    return <p {...rest} styleName='summary'>{children}</p>
  }
}

Summary.propTypes = {
  children: PropTypes.any.isRequired
}

export default Summary
