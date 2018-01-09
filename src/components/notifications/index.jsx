import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NotificationContainer from '_src/components/notifications/container'
import * as notificationsConstants from '_src/constants/notifications'
import * as types from '_src/constants/notifications'

export class Notifications extends React.Component {
  handleClose = payload => {
    this.props.dispatch({
      type: types.REMOVE_NOTIFICATION,
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

export default connect(state => ({
  notifications: state.notifications.items
}))(Notifications)
