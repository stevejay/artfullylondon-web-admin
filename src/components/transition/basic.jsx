import React from 'react'
import PropTypes from 'prop-types'
import Transition, * as rtgTransition from 'react-transition-group/Transition'

const TRANSITION_STYLES = {
  [rtgTransition.ENTERING]: 'in',
  [rtgTransition.ENTERED]: 'in',
  [rtgTransition.EXITING]: 'out',
  [rtgTransition.EXITED]: 'out'
}

class BasicTransition extends React.Component {
  render () {
    const { className, children, timeoutMs, ...rest } = this.props
    const childClassName = children.props.className

    return (
      <Transition {...rest} timeout={timeoutMs}>
        {(status, innerProps) =>
          React.cloneElement(children, {
            ...innerProps,
            className: `${className} ${childClassName || ''} ${TRANSITION_STYLES[status]}`
          })}
      </Transition>
    )
  }
}

BasicTransition.propTypes = {
  in: PropTypes.bool,
  timeoutMs: PropTypes.number,
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  appear: PropTypes.bool,
  className: PropTypes.string,
  onEnter: PropTypes.func,
  onExit: PropTypes.func
}

BasicTransition.defaultProps = {
  in: false,
  timeoutMs: 200,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  className: ''
}

export default BasicTransition
