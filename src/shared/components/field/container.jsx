import React from 'react'
import PropTypes from 'prop-types'

import FieldLabel from '_src/shared/components/field/label'
import FieldError from '_src/shared/components/field/error'
import './container.scss'

const Container = ({
  label,
  htmlFor,
  error,
  touched,
  required,
  disabled,
  children,
  tooltip,
  className,
  ...rest
}) => {
  const hasError = !!touched && !!error && !disabled

  let containerStyle = label ? 'container' : 'container-no-label'
  containerStyle = disabled ? containerStyle + '-disabled' : containerStyle

  return (
    <div {...rest} className={className} styleName={containerStyle}>
      {!!label &&
        <FieldLabel
          tooltip={tooltip}
          htmlFor={htmlFor}
          error={hasError ? error : null}
          required={required}
          disabled={disabled}
        >
          {label}
        </FieldLabel>}
      {children}
      {hasError && <FieldError error={error} />}
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
  disabled: PropTypes.bool,
  className: PropTypes.string
}

export default Container
