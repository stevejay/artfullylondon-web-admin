import React from 'react'
import PropTypes from 'prop-types'

import './diff.scss'

class Diff extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { changeDiff } = this.props

    return changeDiff
      ? <div
        styleName='container'
        dangerouslySetInnerHTML={{ __html: changeDiff }}
      />
      : null
  }
}

Diff.propTypes = {
  changeDiff: PropTypes.string
}

export default Diff
