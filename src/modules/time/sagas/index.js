import { takeLatest, call, put, select } from 'redux-saga/effects'
import {
  startSubmit,
  stopSubmit,
  reset,
  getFormValues,
  change
} from 'redux-form'
import _ from 'lodash'

import { validate } from '_src/lib/validation'
import { submitErrorHandler } from '_src/lib/saga'
import normalise from '_src/lib/normalise'
import { types } from '../actions'
import * as timeConstants from '../constants'
import * as timeConstraints from '../constants/constraints'
import * as timeNormalisers from '../constants/normalisers'
import * as timeValidation from '../lib/validation'
import * as dateLib from '_src/lib/date'

export function * setNewFormValue (
  parentFormName,
  values,
  propertyName,
  validator
) {
  const formValues = yield select(getFormValues, parentFormName)
  const currentValues = formValues[propertyName]
  const newValue = { ...values, key: dateLib.createTimeKey(values) }
  yield call(validator, currentValues, newValue)
  let newValues = currentValues.slice()
  newValues.push(newValue)
  newValues = _.sortBy(newValues, value => value.key)
  yield put(change(parentFormName, propertyName, newValues))
}

export function * addOpeningTime (action) {
  try {
    const { values, parentFormName } = action.payload
    yield put(startSubmit(timeConstants.ADD_OPENING_TIME_FORM_NAME))
    yield call(validate, values, timeConstraints.OPENING_TIME_CONSTRAINT)
    yield call(
      setNewFormValue,
      parentFormName,
      values,
      'openingTimes',
      timeValidation.validateNewDayEntry
    )
    yield put(stopSubmit(timeConstants.ADD_OPENING_TIME_FORM_NAME))
  } catch (err) {
    yield call(
      submitErrorHandler,
      err,
      timeConstants.ADD_OPENING_TIME_FORM_NAME
    )
  }
}

export function * addAdditionalOpeningTime (action) {
  try {
    const { values, parentFormName } = action.payload
    yield put(startSubmit(timeConstants.ADD_ADDITIONAL_OPENING_TIME_FORM_NAME))

    yield call(
      validate,
      values,
      timeConstraints.ADDITIONAL_OPENING_TIME_CONSTRAINT
    )

    yield call(
      setNewFormValue,
      parentFormName,
      values,
      'additionalOpeningTimes',
      timeValidation.validateNewDateEntry
    )

    yield put(stopSubmit(timeConstants.ADD_ADDITIONAL_OPENING_TIME_FORM_NAME))
  } catch (err) {
    yield call(
      submitErrorHandler,
      err,
      timeConstants.ADD_ADDITIONAL_OPENING_TIME_FORM_NAME
    )
  }
}

export function * addSpecialOpeningTime (action) {
  try {
    const { values, parentFormName } = action.payload
    yield put(startSubmit(timeConstants.ADD_SPECIAL_OPENING_TIME_FORM_NAME))

    yield call(
      validate,
      values,
      timeConstraints.SPECIAL_OPENING_TIME_CONSTRAINT
    )

    yield call(
      setNewFormValue,
      parentFormName,
      values,
      'specialOpeningTimes',
      timeValidation.validateNewDateEntry
    )

    yield put(stopSubmit(timeConstants.ADD_SPECIAL_OPENING_TIME_FORM_NAME))
  } catch (err) {
    yield call(
      submitErrorHandler,
      err,
      timeConstants.ADD_SPECIAL_OPENING_TIME_FORM_NAME
    )
  }
}

export function * addOpeningTimeClosure (action) {
  try {
    const { values, parentFormName } = action.payload
    yield put(startSubmit(timeConstants.ADD_OPENING_TIME_CLOSURE_FORM_NAME))

    yield call(
      validate,
      values,
      timeConstraints.OPENING_TIME_CLOSURE_CONSTRAINT
    )

    yield call(
      setNewFormValue,
      parentFormName,
      values,
      'openingTimesClosures',
      timeValidation.validateNewClosure
    )

    yield put(stopSubmit(timeConstants.ADD_OPENING_TIME_CLOSURE_FORM_NAME))
  } catch (err) {
    yield call(
      submitErrorHandler,
      err,
      timeConstants.ADD_OPENING_TIME_CLOSURE_FORM_NAME
    )
  }
}

export function * addPerformance (action) {
  try {
    const { values, parentFormName } = action.payload
    yield put(startSubmit(timeConstants.ADD_PERFORMANCE_FORM_NAME))
    yield call(validate, values, timeConstraints.PERFORMANCE_CONSTRAINT)

    yield call(
      setNewFormValue,
      parentFormName,
      values,
      'performances',
      timeValidation.validateNewDayEntry
    )

    yield put(stopSubmit(timeConstants.ADD_PERFORMANCE_FORM_NAME))
  } catch (err) {
    yield call(submitErrorHandler, err, timeConstants.ADD_PERFORMANCE_FORM_NAME)
  }
}

export function * addAdditionalPerformance (action) {
  try {
    const { values, parentFormName } = action.payload
    yield put(startSubmit(timeConstants.ADD_ADDITIONAL_PERFORMANCE_FORM_NAME))

    yield call(
      validate,
      values,
      timeConstraints.ADDITIONAL_PERFORMANCE_CONSTRAINT
    )

    yield call(
      setNewFormValue,
      parentFormName,
      values,
      'additionalPerformances',
      timeValidation.validateNewDateEntry
    )

    yield put(stopSubmit(timeConstants.ADD_ADDITIONAL_PERFORMANCE_FORM_NAME))
  } catch (err) {
    yield call(
      submitErrorHandler,
      err,
      timeConstants.ADD_ADDITIONAL_PERFORMANCE_FORM_NAME
    )
  }
}

export function * addSpecialPerformance (action) {
  try {
    const { values, parentFormName } = action.payload
    yield put(startSubmit(timeConstants.ADD_SPECIAL_PERFORMANCE_FORM_NAME))

    yield call(
      validate,
      values,
      timeConstraints.SPECIAL_PERFORMANCES_CONSTRAINT
    )

    yield call(
      setNewFormValue,
      parentFormName,
      values,
      'specialPerformances',
      timeValidation.validateNewDateEntry
    )

    yield put(stopSubmit(timeConstants.ADD_SPECIAL_PERFORMANCE_FORM_NAME))
  } catch (err) {
    yield call(
      submitErrorHandler,
      err,
      timeConstants.ADD_SPECIAL_PERFORMANCE_FORM_NAME
    )
  }
}

export function * addPerformanceClosure (action) {
  try {
    const { values, parentFormName } = action.payload
    yield put(startSubmit(timeConstants.ADD_PERFORMANCE_CLOSURE_FORM_NAME))
    yield call(validate, values, timeConstraints.PERFORMANCE_CLOSURE_CONSTRAINT)

    yield call(
      setNewFormValue,
      parentFormName,
      values,
      'performancesClosures',
      timeValidation.validateNewClosure
    )

    yield put(stopSubmit(timeConstants.ADD_PERFORMANCE_CLOSURE_FORM_NAME))
  } catch (err) {
    yield call(
      submitErrorHandler,
      err,
      timeConstants.ADD_PERFORMANCE_CLOSURE_FORM_NAME
    )
  }
}

export function * addTimesRange (action) {
  try {
    const { parentFormName, values: payloadValues } = action.payload
    yield put(startSubmit(timeConstants.ADD_TIMES_RANGE_FORM_NAME))

    const values = yield call(
      normalise,
      payloadValues,
      timeNormalisers.TIMES_RANGE_NORMALISER
    )

    yield call(validate, values, timeConstraints.TIMES_RANGE_CONSTRAINT)

    yield call(
      setNewFormValue,
      parentFormName,
      values,
      'timesRanges',
      timeValidation.validateNewTimesRange
    )

    yield put(reset(timeConstants.ADD_TIMES_RANGE_FORM_NAME))
    yield put(stopSubmit(timeConstants.ADD_TIMES_RANGE_FORM_NAME))
  } catch (err) {
    yield call(submitErrorHandler, err, timeConstants.ADD_TIMES_RANGE_FORM_NAME)
  }
}

export default [
  takeLatest(types.ADD_OPENING_TIME, addOpeningTime),
  takeLatest(types.ADD_ADDITIONAL_OPENING_TIME, addAdditionalOpeningTime),
  takeLatest(types.ADD_SPECIAL_OPENING_TIME, addSpecialOpeningTime),
  takeLatest(types.ADD_OPENING_TIME_CLOSURE, addOpeningTimeClosure),
  takeLatest(types.ADD_PERFORMANCE, addPerformance),
  takeLatest(types.ADD_ADDITIONAL_PERFORMANCE, addAdditionalPerformance),
  takeLatest(types.ADD_SPECIAL_PERFORMANCE, addSpecialPerformance),
  takeLatest(types.ADD_PERFORMANCE_CLOSURE, addPerformanceClosure),
  takeLatest(types.ADD_TIMES_RANGE, addTimesRange)
]
