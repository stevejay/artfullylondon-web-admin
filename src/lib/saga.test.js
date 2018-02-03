import { SubmissionError, stopSubmit } from 'redux-form'
import { put } from 'redux-saga/effects'
import * as saga from '_src/lib/saga'

const SOME_FORM_NAME = 'some-form-name'

describe('submitErrorHandler', () => {
  it('should stop form submission with the exception errors value when a submission error has been thrown', () => {
    const errors = { name: 'some error' }

    const error = new SubmissionError()
    error.errors = errors

    const generator = saga.submitErrorHandler(error, SOME_FORM_NAME)

    expect(generator.next().value).toEqual(
      put(stopSubmit(SOME_FORM_NAME, errors))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('should stop form submission with the default error value when a general error has been thrown', () => {
    const error = new Error('some message')

    const generator = saga.submitErrorHandler(error, SOME_FORM_NAME)

    expect(generator.next().value).toEqual(
      put(stopSubmit(SOME_FORM_NAME, { _error: 'some message' }))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
