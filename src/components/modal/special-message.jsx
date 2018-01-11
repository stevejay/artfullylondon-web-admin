import React from 'react'
import PropTypes from 'prop-types'
import LogoMinimal from '_src/components/logo/minimal'
import './special-message.scss'

const ModalSpecialMessage = ({ message }) => (
  <div styleName='container'>
    <LogoMinimal />
    <p>
      {message}
    </p>
  </div>
)

ModalSpecialMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default ModalSpecialMessage
