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

export function * addOpeningTimeOrPerformance (
  formName,
  constraint,
  propertyName,
  validator,
  action
) {
  try {
    const { values, parentFormName } = action.payload
    yield put(startSubmit(formName))
    yield call(validate, values, constraint)
    yield call(setNewFormValue, parentFormName, values, propertyName, validator)
    yield put(stopSubmit(formName))
  } catch (err) {
    yield call(submitErrorHandler, err, formName)
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
  takeLatest(
    types.ADD_OPENING_TIME,
    addOpeningTimeOrPerformance,
    timeConstants.ADD_OPENING_TIME_FORM_NAME,
    timeConstraints.OPENING_TIME_CONSTRAINT,
    'openingTimes',
    timeValidation.validateNewDayEntry
  ),
  takeLatest(
    types.ADD_ADDITIONAL_OPENING_TIME,
    addOpeningTimeOrPerformance,
    timeConstants.ADD_ADDITIONAL_OPENING_TIME_FORM_NAME,
    timeConstraints.ADDITIONAL_OPENING_TIME_CONSTRAINT,
    'additionalOpeningTimes',
    timeValidation.validateNewDateEntry
  ),
  takeLatest(
    types.ADD_SPECIAL_OPENING_TIME,
    addOpeningTimeOrPerformance,
    timeConstants.ADD_SPECIAL_OPENING_TIME_FORM_NAME,
    timeConstraints.SPECIAL_OPENING_TIME_CONSTRAINT,
    'specialOpeningTimes',
    timeValidation.validateNewDateEntry
  ),
  takeLatest(
    types.ADD_OPENING_TIME_CLOSURE,
    addOpeningTimeOrPerformance,
    timeConstants.ADD_OPENING_TIME_CLOSURE_FORM_NAME,
    timeConstraints.OPENING_TIME_CLOSURE_CONSTRAINT,
    'openingTimesClosures',
    timeValidation.validateNewClosure
  ),
  takeLatest(
    types.ADD_PERFORMANCE,
    addOpeningTimeOrPerformance,
    timeConstants.ADD_PERFORMANCE_FORM_NAME,
    timeConstraints.PERFORMANCE_CONSTRAINT,
    'performances',
    timeValidation.validateNewDayEntry
  ),
  takeLatest(
    types.ADD_ADDITIONAL_PERFORMANCE,
    addOpeningTimeOrPerformance,
    timeConstants.ADD_ADDITIONAL_PERFORMANCE_FORM_NAME,
    timeConstraints.ADDITIONAL_PERFORMANCE_CONSTRAINT,
    'additionalPerformances',
    timeValidation.validateNewDateEntry
  ),
  takeLatest(
    types.ADD_SPECIAL_PERFORMANCE,
    addOpeningTimeOrPerformance,
    timeConstants.ADD_SPECIAL_PERFORMANCE_FORM_NAME,
    timeConstraints.SPECIAL_PERFORMANCES_CONSTRAINT,
    'specialPerformances',
    timeValidation.validateNewDateEntry
  ),
  takeLatest(
    types.ADD_PERFORMANCE_CLOSURE,
    addOpeningTimeOrPerformance,
    timeConstants.ADD_PERFORMANCE_CLOSURE_FORM_NAME,
    timeConstraints.PERFORMANCE_CLOSURE_CONSTRAINT,
    'performancesClosures',
    timeValidation.validateNewClosure
  ),
  takeLatest(types.ADD_TIMES_RANGE, addTimesRange)
]
