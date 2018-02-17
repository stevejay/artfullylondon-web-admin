import React from 'react'
import PropTypes from 'prop-types'

import Message from '_src/components/message'
import * as globalConstants from '_src/constants'

class FormError extends React.PureComponent {
  render () {
    const { error, hideGenericErrorMessages } = this.props

    if (!error) {
      return null
    }

    if (
      error === globalConstants.GENERIC_ERROR_MESSAGE &&
      hideGenericErrorMessages
    ) {
      return null
    }

    return <Message type='error'>{error}</Message>
  }
}

FormError.propTypes = {
  error: PropTypes.any,
  hideGenericErrorMessages: PropTypes.bool
}

export default FormError
