import React from 'react'
import PropTypes from 'prop-types'
import RadioButton from './index'
import FieldContainer from '_src/components/field/container'
import './field.scss'

const Field = ({
  label,
  options,
  input: { value, name, onChange },
  containerStyle
}) => (
  <FieldContainer
    label={label}
    htmlFor={label}
    required={false}
    disabled={false}
    style={containerStyle}
  >
    <div styleName='options-container'>
      {options.map(option => (
        <RadioButton
          key={option.id}
          checked={value === option.id}
          value={option.id}
          label={option.label}
          name={name}
          onChange={onChange}
        />
      ))}
    </div>
  </FieldContainer>
)

Field.propTypes = {
  label: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  containerStyle: PropTypes.object
}

export default Field
