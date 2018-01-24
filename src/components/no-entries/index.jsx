import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

class NoEntries extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return <div styleName='container'>{this.props.label}</div>
  }
}

NoEntries.propTypes = {
  label: PropTypes.string.isRequired
}

NoEntries.defaultProps = {
  label: 'No Entries'
}

export default NoEntries
