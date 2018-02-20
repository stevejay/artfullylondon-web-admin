import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './index.scss'

class NoEntries extends ShouldNeverUpdateComponent {
  render () {
    return <div styleName='container'>{this.props.message}</div>
  }
}

NoEntries.propTypes = {
  message: PropTypes.string.isRequired
}

NoEntries.defaultProps = {
  message: 'No Entries'
}

export default NoEntries
