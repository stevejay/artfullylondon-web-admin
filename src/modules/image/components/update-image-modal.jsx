import React from 'react'
import PropTypes from 'prop-types'

import Modal from '_src/shared/components/modal'
import ModalContainer from '_src/shared/components/modal/container'
import FadeTransition from '_src/shared/components/transition/fade'
import UpdateImageForm from '../forms/update-image-form'

const UpdateImageModal = ({ show, initialValues, onSubmit, onHide }) => (
  <Modal
    show={show}
    transition={FadeTransition}
    onHide={onHide}
    aria-label='Update Image'
  >
    <ModalContainer title='Edit Copyright' type='narrow' onHide={onHide}>
      <UpdateImageForm onSubmit={onSubmit} initialValues={initialValues} />
    </ModalContainer>
  </Modal>
)

UpdateImageModal.propTypes = {
  show: PropTypes.bool.isRequired,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired
}

export default UpdateImageModal
