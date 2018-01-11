import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-overlays'
import Transition from './transition'
import './modal.scss'

const SidenavModal = ({ show, onHide, children }) => (
  <Modal
    aria-label='Navigation menu'
    styleName='modal'
    backdropClassName='backdrop'
    show={show}
    onHide={onHide}
    transition={Transition}
    timeout={250}
  >
    <div styleName='content' className='nocontent' role='navigation'>
      {children}
    </div>
  </Modal>
)

SidenavModal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.any,
  onHide: PropTypes.func.isRequired
}

export default SidenavModal
