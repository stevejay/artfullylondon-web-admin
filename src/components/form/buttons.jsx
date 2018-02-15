import React from 'react'
import PropTypes from 'prop-types'

import Button from '_src/components/button'
import './buttons.scss'

class FormButtons extends React.PureComponent {
  render () {
    const {
      submitLabel,
      submitting,
      onPrevious,
      onCancel,
      containerStyle
    } = this.props

    return (
      <div styleName='container' style={containerStyle}>
        {!!onPrevious &&
          <Button
            aria-label='Go back to previous form'
            onClick={onPrevious}
            disabled={submitting}
            styleName='back-button'
          >
            Previous
          </Button>}
        {!!onCancel &&
          <Button
            aria-label='Cancel the form'
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </Button>}
        <Button
          aria-label='Submit the form'
          type='submit'
          submitting={submitting}
        >
          {submitLabel}
        </Button>
      </div>
    )
  }
}

FormButtons.propTypes = {
  submitting: PropTypes.bool.isRequired,
  submitLabel: PropTypes.string,
  onPrevious: PropTypes.func,
  onCancel: PropTypes.func,
  containerStyle: PropTypes.object
}

FormButtons.defaultProps = {
  submitLabel: 'Submit'
}

export default FormButtons
