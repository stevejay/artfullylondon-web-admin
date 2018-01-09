import React from 'react'
import PropTypes from 'prop-types'
import Label from './label'
import Error from './error'
import './container.m.scss'

const Container = ({
  label,
  htmlFor,
  error,
  touched,
  required,
  disabled,
  children,
  tooltip,
  ...rest
}) => {
  const hasError = !!touched && !!error && !disabled

  let containerStyle = label ? 'container' : 'container-no-label'
  containerStyle = disabled ? containerStyle + '-disabled' : containerStyle

  return (
    <div {...rest} styleName={containerStyle}>
      {!!label &&
        <Label
          tooltip={tooltip}
          htmlFor={htmlFor}
          error={hasError ? error : null}
          required={required}
          disabled={disabled}
        >
          {label}
        </Label>}
      {children}
      {hasError && <Error error={error} />}
    </div>
  )
}

Container.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  children: PropTypes.any,
  error: PropTypes.any,
  touched: PropTypes.any,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

export default Container
