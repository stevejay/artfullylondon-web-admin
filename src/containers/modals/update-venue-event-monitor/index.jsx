import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoaderPanel from '_src/components/loader/panel'
import ModalContainer from '_src/components/modal/container'
import UpdateMonitorForm from '_src/containers/forms/update-monitor'

export const UpdateVenueEventMonitorModal = ({
  onSubmit,
  getInProgress,
  getFailed,
  initialValues,
  onHide
}) => {
  const showForm = !getInProgress && !getFailed

  return (
    <ModalContainer title='Edit Event Monitor' type='wide' onHide={onHide}>
      {getInProgress && <LoaderPanel size='medium' />}
      {getFailed && <div>Failed</div>}
      {showForm &&
        <UpdateMonitorForm onSubmit={onSubmit} initialValues={initialValues} />}
    </ModalContainer>
  )
}

UpdateVenueEventMonitorModal.propTypes = {
  initialValues: PropTypes.object,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  getInProgress: PropTypes.bool.isRequired,
  getFailed: PropTypes.bool.isRequired
}

export default connect(state => ({
  initialValues: state.eventMonitorForEdit.venueEventMonitor,
  getInProgress: state.eventMonitorForEdit.getInProgress,
  getFailed: state.eventMonitorForEdit.getFailed
}))(UpdateVenueEventMonitorModal)
