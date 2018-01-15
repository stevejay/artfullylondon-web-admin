import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NotificationContainer from '_src/components/notifications/container'
import { removeNotification } from '_src/actions/notifications'

const Notifications = ({ notifications, removeNotification }) => (
  <NotificationContainer
    notifications={notifications}
    onClose={removeNotification}
  />
)

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  removeNotification: PropTypes.func.isRequired
}

export default connect(
  state => ({
    notifications: state.notifications.items
  }),
  dispatch => ({
    removeNotification: bindActionCreators(removeNotification, dispatch)
  })
)(Notifications)
