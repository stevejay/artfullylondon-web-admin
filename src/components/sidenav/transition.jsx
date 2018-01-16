import React from 'react'
import ReactTransition from 'react-transition-group/Transition'

const Transition = props => (
  <ReactTransition
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
