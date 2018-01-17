import React from 'react'

import BasicTransition from '_src/components/transition/basic'
import './backdrop.scss'

const BackdropTransition = props => (
  <BasicTransition {...props} styleName='backdrop-transition' />
)

export default BackdropTransition
