import React from 'react'
import PropTypes from 'prop-types'

import BasicTransition from '_src/components/transition/basic'
import * as browserLib from '_src/lib/browser'
import styles from './fade.scss'

const FadeTransition = props => (
  <BasicTransition
    {...props}
    timeoutMs={+styles.animationDuration}
    mountOnEnter
    unmountOnExit
    onEnter={browserLib.forceReflow}
    onExit={browserLib.forceReflow}
    styleName='fade-transition'
  />
)

FadeTransition.propTypes = {
  in: PropTypes.bool.isRequired
}

export default FadeTransition
