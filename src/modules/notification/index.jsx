import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import NotificationItem from '_src/modules/notification/components/notification'
import * as notificationConstants from '_src/constants/notification'
import { selectors, notificationActions } from '_src/store'
import './index.scss'

export class Notification extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.notifications !== this.props.notifications
  }
  handleClose = ({ id }) => {
    this.props.dispatch(notificationActions.removeNotification(id))
  }
  render () {
    return (
      <TransitionGroup styleName='container' component='ul' role='presentation'>
        {this.props.notifications.map(notification => (
          <CSSTransition
            key={notification.id}
            classNames='notification'
            timeout={250}
          >
            <NotificationItem
              notification={notification}
              onClose={this.handleClose}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    )
  }
}

Notification.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(notificationConstants.ALLOWED_NOTIFICATION_TYPES)
        .isRequired
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({ notifications: selectors.notifications(state) })
)(Notification)
