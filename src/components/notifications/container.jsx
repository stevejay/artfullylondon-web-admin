import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Notification from '_src/components/notifications/notification'
import * as notificationsConstants from '_src/constants/notifications'
import './container.scss'

class NotificationContainer extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.notifications !== this.props.notifications
  }
  render () {
    const { notifications, onClose } = this.props

    return (
      <TransitionGroup styleName='container' component='ul' role='presentation'>
        {notifications.map(notification => (
          <CSSTransition
            key={notification.id}
            classNames='notification'
            timeout={250}
          >
            <Notification notification={notification} onClose={onClose} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    )
  }
}

NotificationContainer.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(notificationsConstants.ALLOWED_NOTIFICATION_TYPES)
        .isRequired
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired
}

export default NotificationContainer
