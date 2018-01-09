import React from 'react'
import * as ReactOverlays from 'react-overlays'

const Transition = props => (
  <ReactOverlays.Transition
    in={false}
    timeout={250}
    unmountOnExit={false}
    transitionAppear={false}
    {...props}
    className='sidenav-transition'
    enteredClassName='in'
    enteringClassName='in'
    exitedClassName='out'
    exitingClassName='out'
  />
)

export default Transition
