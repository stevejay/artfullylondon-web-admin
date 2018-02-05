import React from 'react'
import PropTypes from 'prop-types'
import { shouldUpdate } from 'recompose'

import CloseButton from '_src/components/button/close'
import * as notificationConstants from '_src/modules/notification/constants'
import './notification.scss'

export class Notification extends React.Component {
  handleCloseClick = () => {
    this.props.onClose({ id: this.props.notification.id })
  }
  render () {
    const { notification } = this.props
    const type = notification.type.toLowerCase()

    return (
      <li styleName={`notification-${type}`} role='alert'>
        <CloseButton
          type={type}
          ariaLabel='Close venue events viewer'
          onClick={this.handleCloseClick}
        />
        {!!notification.title &&
          <h4 styleName='title'>
            {notification.title}
          </h4>}
        {!!notification.message &&
          <p styleName='message'>
            {notification.message}
          </p>}
      </li>
    )
  }
}

Notification.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.oneOf(notificationConstants.ALLOWED_NOTIFICATION_TYPES)
      .isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
}

export default shouldUpdate(/* istanbul ignore next */ () => false)(
  Notification
)
