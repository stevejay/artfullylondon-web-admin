import React from 'react'
import PropTypes from 'prop-types'

import * as notificationsConstants from '_src/constants/notifications'
import CloseButton from '_src/components/button/close'
import './notification.m.scss'

class Notification extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  handleCloseClick = () => {
    this.props.onClose({ id: this.props.notification.id })
  }
  render () {
    const { notification } = this.props
    const type = notification.type.toLowerCase()
    const containerStyleName = `container-${type}`

    return (
      <li styleName={containerStyleName} role='alert'>
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
    type: PropTypes.oneOf(notificationsConstants.ALLOWED_NOTIFICATION_TYPES)
      .isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
}

export default Notification
