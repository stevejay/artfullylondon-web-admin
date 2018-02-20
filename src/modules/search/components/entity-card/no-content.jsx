import React from 'react'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import './no-content.scss'

class NoContent extends ShouldNeverUpdateComponent {
  render () {
    return (
      <div styleName='container'>
        <ThumbsDown aria-label='None found' styleName='graphic' />
      </div>
    )
  }
}

export default NoContent
