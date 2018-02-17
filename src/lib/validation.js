import { ensure } from 'ensure-request'
import { SubmissionError } from 'redux-form'

import * as globalConstants from '_src/constants'

export function validate (
  values,
  constraint,
  additionalConstraints,
  returnErrors
) {
  return new Promise(resolve => {
    const errors = ensure(values, constraint) || {}

    if (additionalConstraints) {
      additionalConstraints(values, errors)
    }

    if (returnErrors) {
      resolve(_hasErrors(errors) ? errors : null)
    } else {
      _throwValidationErrorIfInvalid(errors)
      resolve(values)
    }
  })
}

function _throwValidationErrorIfInvalid (errors) {
  if (_hasErrors(errors)) {
    errors._error = errors._error || globalConstants.GENERIC_ERROR_MESSAGE
    throw new SubmissionError(errors)
  }
}

function _hasErrors (errors) {
  return errors && Object.keys(errors).length > 0
}
