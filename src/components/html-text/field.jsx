import React from 'react'
import PropTypes from 'prop-types'
import RichTextEditor from 'react-rte'
import FieldContainer from '_src/components/field/container'
import './field.m.scss'

const CUSTOM_STYLE_MAP = {
  BOLD: {
    fontFamily: '"Libre Franklin", Sans-Serif',
    fontStyle: 'normal',
    fontWeight: '600'
  }
}

const HtmlTextField = props => {
  const {
    label,
    input: { value, onChange },
    meta: { touched, error },
    required,
    maxLength,
    placeholder
  } = props

  return (
    <FieldContainer
      label={label}
      htmlFor={label}
      error={error}
      touched={touched}
      required={required}
    >
      <RichTextEditor
        styleName='rte'
        value={value}
        onChange={onChange}
        name={label}
        maxLength={maxLength}
        placeholder={placeholder}
        editorClassName='rte-editor'
        customStyleMap={CUSTOM_STYLE_MAP}
      />
    </FieldContainer>
  )
}

HtmlTextField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  maxLength: PropTypes.number.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string
}

export default HtmlTextField
