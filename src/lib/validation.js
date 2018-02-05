import { ensure } from 'ensure-request'
import { SubmissionError } from 'redux-form'

import * as linkConstants from '_src/constants/link'
import * as validationConstants from '_src/constants/validation'

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
    errors._error = errors._error || validationConstants.GENERIC_ERROR_MESSAGE
    throw new SubmissionError(errors)
  }
}

function _hasErrors (errors) {
  return errors && Object.keys(errors).length > 0
}

export function validateLink (values, errors) {
  if (!isValidUrlForLinkType(values.linkUrl, values.linkType)) {
    errors.linkUrl = 'Link Url is in wrong format for the link type'
  }
}

function isValidUrlForLinkType (url, type) {
  switch (type) {
    case linkConstants.LINK_TYPE_TWITTER:
      return /https:\/\/twitter\.com\//.test(url)
    case linkConstants.LINK_TYPE_WIKIPEDIA:
      return /https:\/\/en\.wikipedia\.org\//.test(url)
    case linkConstants.LINK_TYPE_FACEBOOK:
      return /https:\/\/www\.facebook\.com\//.test(url)
    case linkConstants.LINK_TYPE_INSTAGRAM:
      return /https:\/\/www\.instagram\.com\//.test(url)
  }

  // all other link types have no validation:
  return true
}
