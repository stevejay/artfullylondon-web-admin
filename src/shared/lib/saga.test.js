import { SubmissionError, stopSubmit } from 'redux-form'
import { put, call } from 'redux-saga/effects'
import log from 'loglevel'

import * as sagaLib from '_src/shared/lib/saga'

const SOME_FORM_NAME = 'some-form-name'

describe('submitErrorHandler', () => {
  it('should stop form submission with the exception errors value when a submission error has been thrown', () => {
    const errors = { name: 'some error' }

    const error = new SubmissionError()
    error.errors = errors

    const generator = sagaLib.submitErrorHandler(error, SOME_FORM_NAME)

    let result = generator.next()
    expect(result.value).toEqual(call(log.error, error))

    result = generator.next()
    expect(result.value).toEqual(put(stopSubmit(SOME_FORM_NAME, errors)))

    result = generator.next()
    expect(result.done).toEqual(true)
  })

  it('should stop form submission with the default error value when a general error has been thrown', () => {
    const error = new Error('some message')

    const generator = sagaLib.submitErrorHandler(error, SOME_FORM_NAME)

    let result = generator.next()
    expect(result.value).toEqual(call(log.error, error))

    result = generator.next()
    expect(result.value).toEqual(
      put(stopSubmit(SOME_FORM_NAME, { _error: 'some message' }))
    )

    result = generator.next()
    expect(result.done).toEqual(true)
  })
})
