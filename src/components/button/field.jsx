import React from 'react'
import PropTypes from 'prop-types'
import FieldContainer from '_src/components/field/container'
import Button from '_src/components/button'

const CONTAINER_STYLE = { flexGrow: 0, flexShrink: 0 }

class ButtonField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.disabled !== this.props.disabled ||
      nextProps.submitting !== this.props.submitting
    )
  }
  render () {
    const { label, type, disabled, submitting, onClick } = this.props

    return (
      <FieldContainer label='' htmlFor={label} style={CONTAINER_STYLE}>
        <Button
          type={type}
          name={label}
          disabled={disabled}
          submitting={submitting}
          onClick={onClick}
        >
          {label}
        </Button>
      </FieldContainer>
    )
  }
}

ButtonField.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  submitting: PropTypes.bool
}

export default ButtonField
