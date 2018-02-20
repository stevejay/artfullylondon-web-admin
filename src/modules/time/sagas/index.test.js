import { call, put, select } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import {
  startSubmit,
  stopSubmit,
  reset,
  getFormValues,
  change
} from 'redux-form'

import { validate } from '_src/lib/validation'
import { submitErrorHandler } from '_src/lib/saga'
import normalise from '_src/lib/normalise'
import * as timeSagas from './index'
import * as timeConstants from '../constants'
import * as timeConstraints from '../constants/constraints'
import * as timeNormalisers from '../constants/normalisers'
import * as timeValidation from '../lib/validation'
import * as dateLib from '_src/lib/date'

describe('addOpeningTimeOrPerformance', () => {
  const values = { name: 'Foo' }
  const constraint = jest.fn()
  const validator = jest.fn()

  const generator = cloneableGenerator(
    timeSagas.addOpeningTimeOrPerformance
  )('FormName', constraint, 'someProperty', validator, {
    payload: {
      parentFormName: 'ParentFormName',
      values
    }
  })

  it('should prepare to add the time', () => {
    let result = generator.next()
    expect(result.value).toEqual(put(startSubmit('FormName')))

    result = generator.next()
    expect(result.value).toEqual(call(validate, values, constraint))
  })

  it('should successfully add the time', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()
    expect(result.value).toEqual(
      call(
        timeSagas.setNewFormValue,
        'ParentFormName',
        values,
        'someProperty',
        validator
      )
    )

    result = generatorClone.next()
    expect(result.value).toEqual(put(stopSubmit('FormName')))

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })

  it('should handle an error when adding the time', () => {
    const generatorClone = generator.clone()
    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)
    expect(result.value).toEqual(call(submitErrorHandler, error, 'FormName'))

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })
})

describe('addTimesRange', () => {
  const values = { name: 'Foo' }

  const generator = cloneableGenerator(timeSagas.addTimesRange)({
    payload: {
      parentFormName: 'ParentFormName',
      values
    }
  })

  it('should prepare to add the times range', () => {
    let result = generator.next()
    expect(result.value).toEqual(
      put(startSubmit(timeConstants.ADD_TIMES_RANGE_FORM_NAME))
    )

    result = generator.next()
    expect(result.value).toEqual(
      call(normalise, values, timeNormalisers.TIMES_RANGE_NORMALISER)
    )

    result = generator.next({ name: 'Normalised Foo' })
    expect(result.value).toEqual(
      call(
        validate,
        { name: 'Normalised Foo' },
        timeConstraints.TIMES_RANGE_CONSTRAINT
      )
    )
  })

  it('should successfully add the times range', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()
    expect(result.value).toEqual(
      call(
        timeSagas.setNewFormValue,
        'ParentFormName',
        { name: 'Normalised Foo' },
        'timesRanges',
        timeValidation.validateNewTimesRange
      )
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(reset(timeConstants.ADD_TIMES_RANGE_FORM_NAME))
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(stopSubmit(timeConstants.ADD_TIMES_RANGE_FORM_NAME))
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })

  it('should handle an error when adding the times range', () => {
    const generatorClone = generator.clone()
    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)
    expect(result.value).toEqual(
      call(submitErrorHandler, error, timeConstants.ADD_TIMES_RANGE_FORM_NAME)
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })
})

describe('setNewFormValue', () => {
  it('should set the new form value', () => {
    const validator = jest.fn()
    dateLib.createTimeKey = jest.fn().mockReturnValue('time-key-1')

    const generator = timeSagas.setNewFormValue(
      'ParentFormName',
      { name: 'Foo' },
      'someProperty',
      validator
    )

    let result = generator.next()
    expect(result.value).toEqual(select(getFormValues, 'ParentFormName'))

    result = generator.next({ someProperty: [{ key: 'time-key-2' }] })
    expect(result.value).toEqual(
      call(validator, [{ key: 'time-key-2' }], {
        name: 'Foo',
        key: 'time-key-1'
      })
    )

    result = generator.next()
    expect(result.value).toEqual(
      put(
        change('ParentFormName', 'someProperty', [
          {
            name: 'Foo',
            key: 'time-key-1'
          },
          { key: 'time-key-2' }
        ])
      )
    )

    result = generator.next()
    expect(result.done).toEqual(true)
  })
})
