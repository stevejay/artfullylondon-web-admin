import React from 'react'

import BasicTransition from '_src/components/transition/basic'
import * as browserLib from '_src/lib/browser'
import styles from './transition.scss'

const DropdownTransition = props => (
  <BasicTransition
    {...props}
    timeoutMs={+styles.animationDuration}
    mountOnEnter
    unmountOnExit
    onEnter={browserLib.forceReflow}
    onExit={browserLib.forceReflow}
    styleName='dropdown-transition'
  />
)

export default DropdownTransition
