import React from 'react'
import PropTypes from 'prop-types'

import Button from '_src/components/button'
import './sub-form-buttons.scss'

class SubFormButtons extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.submitting !== this.props.submitting ||
      nextProps.pristine !== this.props.pristine
    )
  }
  render () {
    const { submitting, onSubmit, onReset, pristine } = this.props

    return (
      <div styleName='container'>
        {!!onReset &&
          <Button
            aria-label='Reset the sub form'
            onClick={onReset}
            disabled={pristine || submitting}
          >
            Reset
          </Button>}
        <Button
          aria-label='Submit the sub form'
          disabled={pristine}
          submitting={submitting}
          onClick={onSubmit}
        >
          Add
        </Button>
      </div>
    )
  }
}

SubFormButtons.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func
}

export default SubFormButtons
