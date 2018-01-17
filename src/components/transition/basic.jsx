import React from 'react'
import PropTypes from 'prop-types'
import Transition, * as rtgTransition from 'react-transition-group/Transition'

const TRANSITION_STYLES = {
  [rtgTransition.ENTERING]: 'in',
  [rtgTransition.ENTERED]: 'in',
  [rtgTransition.EXITING]: 'out',
  [rtgTransition.EXITED]: 'out'
}

const BasicTransition = props => {
  const { className, children, ...rest } = props
  const childClassName = children.props ? children.props.className : ''

  return (
    <Transition {...rest}>
      {(status, innerProps) =>
        React.cloneElement(children, {
          ...innerProps,
          className: `${className} ${childClassName || ''} ${TRANSITION_STYLES[status]}`
        })}
    </Transition>
  )
}

BasicTransition.propTypes = {
  in: PropTypes.bool,
  timeout: PropTypes.number,
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  appear: PropTypes.bool,
  className: PropTypes.string,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func
}

BasicTransition.defaultProps = {
  in: false,
  timeout: 200,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  className: ''
}

export default BasicTransition
