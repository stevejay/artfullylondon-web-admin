import React from 'react'
import PropTypes from 'prop-types'
import { Modal as ReactOverlaysModal } from 'react-overlays'

// import BackdropTransition from '_src/components/transition/backdrop'

import FadeTransition from '_src/components/transition/fade'
import './index.scss'

export const Modal = ({
  show,
  transition,
  backdropTransition,
  children,
  onHide,
  ...rest
}) => (
  <ReactOverlaysModal
    {...rest}
    show={show}
    backdrop
    backdropClassName='backdrop'
    transition={transition}
    backdropTransition={backdropTransition}
    onHide={onHide}
  >
    {children}
  </ReactOverlaysModal>
)

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  transition: PropTypes.func.isRequired,
  backdropTransition: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  onHide: PropTypes.func.isRequired
}

Modal.defaultProps = {
  backdropTransition: FadeTransition
}

export default Modal
