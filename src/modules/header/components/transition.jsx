import React from 'react'
import RTGTransition from 'react-transition-group/Transition'

const Transition = props => (
  <RTGTransition {...props} appear unmountOnExit={false} timeout={200}>
    {state => (
      <div className={`header-menu-transition-${state}`}>
        {props.children}
      </div>
    )}
  </RTGTransition>
)

export default Transition
