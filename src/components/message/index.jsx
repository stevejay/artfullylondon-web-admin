import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Alert from 'react-icons/lib/fa/exclamation-triangle'
import Checkmark from 'react-icons/lib/fa/check'
import Speakerphone from 'react-icons/lib/fa/info-circle'
import './index.scss'

const ALLOWED_MESSAGE_TYPES = [
  'basic',
  'basic-gray',
  'info',
  'warning',
  'success',
  'error',
  'validation',
  'field'
]

class Message extends React.PureComponent {
  getIcon (type) {
    switch (type) {
      case 'warning':
      case 'error':
        return Alert
      case 'success':
        return Checkmark
      case 'info':
        return Speakerphone
    }
  }
  render () {
    const {
      type,
      title,
      children,
      showIcon,
      icon,
      linkTo,
      message, // eslint-disable-line
      ...rest
    } = this.props

    const chosenIcon = icon || this.getIcon(type)

    const iconElement =
      (showIcon || icon) &&
      !!chosenIcon &&
      React.createElement(chosenIcon, { styleName: 'icon' })

    const content = (
      <div styleName='text'>
        {title && <h4 styleName='title'>{title}</h4>}
        {children && <div styleName='detail'>{children}</div>}
      </div>
    )

    if (linkTo) {
      return (
        <Link {...rest} to={linkTo} styleName={type} role='alert'>
          {iconElement}
          {content}
        </Link>
      )
    } else {
      return (
        <div {...rest} styleName={type} role='alert'>
          {iconElement}
          {content}
        </div>
      )
    }
  }
}

Message.propTypes = {
  type: PropTypes.oneOf(ALLOWED_MESSAGE_TYPES).isRequired,
  title: PropTypes.any,
  children: PropTypes.any,
  showIcon: PropTypes.bool,
  icon: PropTypes.func,
  linkTo: PropTypes.string
}

Message.defaultProps = {
  showIcon: false
}

export default Message
