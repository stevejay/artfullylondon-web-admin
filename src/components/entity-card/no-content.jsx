import React from 'react'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'

import './no-content.scss'

class NoContent extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return (
      <div styleName='container'>
        <ThumbsDown aria-label='None found' styleName='graphic' />
      </div>
    )
  }
}

export default NoContent
