import React from 'react'

import BasicTransition from '_src/components/transition/basic'
import './transition.scss'

const DropdownTransition = props => (
  <BasicTransition {...props} styleName='dropdown-transition' />
)

export default DropdownTransition
