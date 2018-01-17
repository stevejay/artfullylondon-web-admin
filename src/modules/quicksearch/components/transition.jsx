import React from 'react'
import PropTypes from 'prop-types'
import RTGTransition, * as rtgTransition
  from 'react-transition-group/Transition'

const TRANSITION_STYLES = {
  [rtgTransition.ENTERING]: 'in',
  [rtgTransition.ENTERED]: 'in',
  [rtgTransition.EXITING]: 'out',
  [rtgTransition.EXITED]: 'out'
}

const Transition = props => {
  const { className, children, ...rest } = props
  const childClassName = children.props ? children.props.className : ''

  return (
    <RTGTransition {...rest}>
      {(status, innerProps) =>
        React.cloneElement(children, {
          ...innerProps,
          className: `quicksearch-transition ${className} ${childClassName || ''} ${TRANSITION_STYLES[status]}`
        })}
    </RTGTransition>
  )
}

Transition.propTypes = {
  in: PropTypes.bool,
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  appear: PropTypes.bool,
  timeout: PropTypes.number,
  className: PropTypes.string,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func
}

Transition.defaultProps = {
  in: false,
  timeout: 200,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  className: ''
}

export default Transition
