import React from 'react'
import PropTypes from 'prop-types'
import ModalContainer from '_src/components/modal/container'
import UpdateImageForm from '_src/containers/forms/update-image'

const UpdateImageModal = ({ formData, onSubmit, onHide }) => (
  <ModalContainer title='Edit Copyright' type='narrow' onHide={onHide}>
    <UpdateImageForm onSubmit={onSubmit} formData={formData} />
  </ModalContainer>
)

UpdateImageModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    copyright: PropTypes.string
  }).isRequired
}

export default UpdateImageModal
