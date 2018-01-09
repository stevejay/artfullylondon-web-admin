import React from 'react'
import PropTypes from 'prop-types'
import FieldError from '_src/components/field/error'
import Checkbox from './index'

const CONTAINER_STYLE = { marginBottom: '1.5rem' }

class BasicField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.meta.error !== this.props.meta.error
    )
  }
  render () {
    const {
      label,
      input: { value, onChange },
      meta: { touched, error }
    } = this.props

    // TODO shouldn't the error only be shown if also touched?

    return (
      <div style={CONTAINER_STYLE}>
        <Checkbox
          checked={!!value}
          onChange={onChange}
          error={error}
          touched={touched}
        >
          {label}
        </Checkbox>
        <FieldError error={error} />
      </div>
    )
  }
}

BasicField.propTypes = {
  label: PropTypes.any.isRequired,
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired
}

export default BasicField
