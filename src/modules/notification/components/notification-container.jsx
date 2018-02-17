import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Notification from './notification'
import * as notificationConstants from '../constants'
import * as notificationActions from '../actions'
import { selectors } from '../reducers'
import './notification-container.scss'

export class NotificationContainer extends React.PureComponent {
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
            <Notification
              notification={notification}
              onClose={this.handleClose}
            />
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
      type: PropTypes.oneOf(notificationConstants.ALLOWED_NOTIFICATION_TYPES)
        .isRequired
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({ notifications: selectors.notifications(state) })
)(NotificationContainer)
