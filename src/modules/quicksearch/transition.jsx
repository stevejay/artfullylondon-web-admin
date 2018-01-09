import React from 'react'
import * as ReactOverlays from 'react-overlays'

const Transition = props => (
  <ReactOverlays.Transition
    {...props}
    in={false}
    timeout={250}
    unmountOnExit={false}
    transitionAppear={false}
    className='search-transition'
    enteredClassName='in'
    enteringClassName='in'
    exitedClassName='out'
    exitingClassName='out'
  />
)

export default Transition
