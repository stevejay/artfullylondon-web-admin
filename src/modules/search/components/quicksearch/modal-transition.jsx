import React from 'react'

import BasicTransition from '_src/components/transition/basic'
import './modal-transition.scss'

const ModalTransition = props => (
  <BasicTransition {...props} styleName='modal-transition' />
)

export default ModalTransition
