import React from 'react'
import PropTypes from 'prop-types'
import { Modal as OverlaysModal } from 'react-overlays'

import BackdropTransition from '_src/components/transition/backdrop'
import './index.scss'

export class Modal extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.show !== this.props.show
  }
  render () {
    const {
      show,
      transition,
      backdropTransition,
      children,
      onHide,
      ...rest
    } = this.props

    return (
      <OverlaysModal
        {...rest}
        show={show}
        backdrop
        backdropClassName='backdrop'
        transition={transition}
        backdropTransition={backdropTransition}
        aria-label='Quicksearch'
        onHide={onHide}
      >
        {children}
      </OverlaysModal>
    )
  }
}

/* istanbul ignore next */
Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  transition: PropTypes.func.isRequired,
  backdropTransition: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  onHide: PropTypes.func.isRequired
}

/* istanbul ignore next */
Modal.defaultProps = {
  backdropTransition: BackdropTransition
}

export default Modal
