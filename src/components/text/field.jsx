import React from 'react'
import PropTypes from 'prop-types'
import Container from '_src/components/field/container'
import RemainingChars from '_src/components/field/remaining-chars'
import Text from './index'

class TextField extends React.Component {
  constructor (props) {
    super(props)
    this.state = { active: false }
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.meta.error !== this.props.meta.error ||
      nextProps.disabled !== this.props.disabled ||
      nextState.active !== this.state.active
    )
  }
  handleFocus = () => {
    console.log('handleFocus')
    this.setState({ active: true })
  }
  handleBlur = () => {
    console.log('handleBlur')
    this.setState({ active: false })
  }
  render () {
    const {
      label,
      tooltip,
      input: { value, onChange },
      meta: { touched, error },
      required,
      disabled,
      autoFocus,
      maxLength,
      placeholder,
      password,
      autos,
      forceSingleLine,
      remainingChars,
      containerStyle,
      icon
    } = this.props

    const { active } = this.state

    console.log('active', active)

    return (
      <Container
        label={label}
        tooltip={tooltip}
        htmlFor={label}
        error={error}
        touched={touched}
        required={required}
        disabled={disabled}
        style={containerStyle}
      >
        {remainingChars &&
          <RemainingChars
            active={active}
            value={value}
            maxLength={maxLength}
          />}
        <Text
          value={value}
          id={label}
          onChange={onChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          error={error}
          touched={touched}
          disabled={disabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          placeholder={placeholder}
          password={password}
          autos={autos}
          forceSingleLine={forceSingleLine}
          icon={icon}
        />
      </Container>
    )
  }
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  maxLength: PropTypes.number.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  password: PropTypes.bool,
  autos: PropTypes.bool,
  forceSingleLine: PropTypes.bool,
  remainingChars: PropTypes.bool,
  containerStyle: PropTypes.object,
  icon: PropTypes.func
}

TextField.defaultProps = {
  remainingChars: true
}

export default TextField
