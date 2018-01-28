import React from 'react'
import PropTypes from 'prop-types'

import Modal from '_src/components/modal'
import ModalContainer from '_src/components/modal/container'
import UpdateImageForm from '_src/components/image-grid/update-image-form'
import FadeTransition from '_src/components/transition/fade'

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
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired
}

export default UpdateImageModal
