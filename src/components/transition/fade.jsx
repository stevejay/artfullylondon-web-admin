import React from 'react'

import BasicTransition from '_src/components/transition/basic'
import styles from './fade.scss'

class FadeTransition extends React.Component {
  reflow = node => {
    // Force a repaint before the in/out classname gets added:
    node && node.scrollTop
  }
  render () {
    return (
      <BasicTransition
        {...this.props}
        timeoutMs={+styles.animationDuration}
        mountOnEnter
        unmountOnExit
        onEnter={this.reflow}
        onExit={this.reflow}
        styleName='fade-transition'
      />
    )
  }
}

export default FadeTransition
