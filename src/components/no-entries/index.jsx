import React from 'react'

import './index.scss'

class NoEntries extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return <div styleName='container'>No Entries</div>
  }
}

export default NoEntries
