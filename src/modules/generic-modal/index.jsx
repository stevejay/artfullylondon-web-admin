import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from '_src/components/modal'
import { hideModal } from '_src/actions/modal'

export const GenericModal = ({
  showingModal,
  modalComponent,
  hideModal,
  modalProps,
  modalComponentProps
}) => (
  <Modal
    show={showingModal}
    onHide={hideModal}
    modalProps={modalProps}
    component={modalComponent}
    componentProps={modalComponentProps}
  />
)

GenericModal.propTypes = {
  showingModal: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  modalComponent: PropTypes.func,
  modalComponentProps: PropTypes.object,
  hideModal: PropTypes.func.isRequired
}

export default connect(
  state => ({
    showingModal: state.modal.showModal,
    modalProps: state.modal.modalProps,
    modalComponent: state.modal.component,
    modalComponentProps: state.modal.componentProps
  }),
  dispatch => ({
    hideModal: bindActionCreators(hideModal, dispatch)
  })
)(GenericModal)
