import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NotificationContainer
  from '_src/modules/notifications/components/notification-container'
import * as notificationsConstants from '_src/constants/notifications'
import * as notificationActionTypes from '_src/constants/action/notification'

export class Notifications extends React.Component {
  handleClose = payload => {
    this.props.dispatch({
      type: notificationActionTypes.REMOVE_NOTIFICATION,
      payload
    })
  }
  render () {
    return (
      <NotificationContainer
        notifications={this.props.notifications}
        onClose={this.handleClose}
      />
    )
  }
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(notificationsConstants.ALLOWED_NOTIFICATION_TYPES)
        .isRequired
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({
    notifications: state.notifications.items
  })
)(Notifications)
