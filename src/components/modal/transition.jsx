import React from 'react'
import { Transition } from 'react-overlays'

const transition = props => (
  <Transition
    in={false}
    timeout={250}
    unmountOnExit={false}
    transitionAppear={false}
    {...props}
    className='modal-transition'
    enteredClassName='in'
    enteringClassName='in'
    exitedClassName='out'
    exitingClassName='out' />
)

export default transition
