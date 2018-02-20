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
import * as timeActions from '../actions'
import * as timeConstants from '../constants'
import * as timeConstraints from '../constants/constraints'
import * as timeNormalisers from '../constants/normalisers'
import * as timeValidation from '../lib/validation'
import * as dateLib from '_src/lib/date'

// TODO extract the form value manipulations into a series of separate sagas.

export function * getNewOpeningTimesFormValue (parentFormName, values) {
  const formValues = yield select(getFormValues, parentFormName)
  const openingTimes = formValues.openingTimes

  const newOpeningTime = {
    key: dateLib.createTimeKey(values),
    day: values.day,
    from: values.from,
    to: values.to,
    timesRangeId: values.timesRangeId
  }

  yield call(timeValidation.validateNewDayEntry, openingTimes, newOpeningTime)
  const newOpeningTimes = openingTimes.slice()
  newOpeningTimes.push(newOpeningTime)
  return _.sortBy(newOpeningTimes, value => value.key)
}

export function * getNewAdditionalOpeningTimesFormValue (parentFormName, values) {
  const formValues = yield select(getFormValues, parentFormName)
  const additionalOpeningTimes = formValues.additionalOpeningTimes

  const newAdditionalOpeningTime = {
    key: dateLib.createTimeKey(values),
    date: values.date,
    from: values.from,
    to: values.to
  }

  yield call(
    timeValidation.validateNewDateEntry,
    additionalOpeningTimes,
    newAdditionalOpeningTime
  )

  const newAdditionalOpeningTimes = additionalOpeningTimes.slice()
  newAdditionalOpeningTimes.push(newAdditionalOpeningTime)
  return _.sortBy(newAdditionalOpeningTimes, value => value.key)
}

export function * getNewSpecialOpeningTimesFormValue (parentFormName, values) {
  const formValues = yield select(getFormValues, parentFormName)
  const specialOpeningTimes = formValues.specialOpeningTimes

  const newSpecialOpeningTime = {
    key: dateLib.createTimeKey(values),
    date: values.date,
    from: values.from,
    to: values.to,
    audienceTags: values.audienceTags
  }

  yield call(
    timeValidation.validateNewDateEntry,
    specialOpeningTimes,
    newSpecialOpeningTime
  )

  const newSpecialOpeningTimes = specialOpeningTimes.slice()
  newSpecialOpeningTimes.push(newSpecialOpeningTime)
  return _.sortBy(newSpecialOpeningTimes, value => value.key)
}

export function * getNewOpeningTimesClosuresFormValue (parentFormName, values) {
  const formValues = yield select(getFormValues, parentFormName)
  const closures = formValues.openingTimesClosures

  const newClosure = {
    key: dateLib.createTimeKey(values),
    date: values.date
  }

  if (values.from) {
    newClosure.from = values.from
    newClosure.to = values.to
  }

  yield call(timeValidation.validateNewClosure, closures, newClosure)
  const newClosures = closures.slice()
  newClosures.push(newClosure)
  return _.sortBy(newClosures, value => value.key)
}

export function * getNewPerformancesFormValue (parentFormName, values) {
  const formValues = yield select(getFormValues, parentFormName)
  const performances = formValues.performances

  const newPerformance = {
    key: dateLib.createTimeKey(values),
    day: values.day,
    at: values.at,
    timesRangeId: values.timesRangeId
  }

  yield call(timeValidation.validateNewDayEntry, performances, newPerformance)

  const newPerformances = performances.slice()
  newPerformances.push(newPerformance)
  return _.sortBy(newPerformances, value => value.key)
}

export function * getNewAdditionalPerformancesFormValue (parentFormName, values) {
  const formValues = yield select(getFormValues, parentFormName)
  const additionalPerformances = formValues.additionalPerformances

  const newAdditional = {
    key: dateLib.createTimeKey(values),
    date: values.date,
    at: values.at
  }

  yield call(
    timeValidation.validateNewDateEntry,
    additionalPerformances,
    newAdditional
  )

  const newAdditionalPerformances = additionalPerformances.slice()
  newAdditionalPerformances.push(newAdditional)
  return _.sortBy(newAdditionalPerformances, value => value.key)
}

export function * getNewSpecialPerformancesFormValue (parentFormName, values) {
  const formValues = yield select(getFormValues, parentFormName)
  const specialPerformances = formValues.specialPerformances

  const newSpecialPerformance = {
    key: dateLib.createTimeKey(values),
    date: values.date,
    at: values.at,
    audienceTags: values.audienceTags
  }

  yield call(
    timeValidation.validateNewDateEntry,
    specialPerformances,
    newSpecialPerformance
  )

  const newSpecialPerformances = specialPerformances.slice()
  newSpecialPerformances.push(newSpecialPerformance)
  return _.sortBy(newSpecialPerformances, value => value.key)
}

export function * getNewPerformancesClosuresFormValue (parentFormName, values) {
  const formValues = yield select(getFormValues, parentFormName)
  const closures = formValues.performancesClosures

  const newClosure = {
    key: dateLib.createTimeKey(values),
    date: values.date
  }

  if (values.at) {
    newClosure.at = values.at
  }

  yield call(timeValidation.validateNewClosure, closures, newClosure)
  const newClosures = closures.slice()
  newClosures.push(newClosure)
  return _.sortBy(newClosures, value => value.key)
}

export function * getNewTimesRangesFormValue (parentFormName, values) {
  const formValues = yield select(getFormValues, parentFormName)
  const timesRanges = formValues.timesRanges

  const newTimesRange = {
    key: values.dateFrom,
    id: values.dateFrom,
    dateFrom: values.dateFrom,
    dateTo: values.dateTo
  }

  if (values.label) {
    newTimesRange.label = values.label
  }

  yield call(timeValidation.validateNewTimesRange, timesRanges, newTimesRange)

  const newTimesRanges = timesRanges.slice()
  newTimesRanges.push(newTimesRange)
  return _.sortBy(newTimesRanges, value => value.dateFrom)
}

export function * addOpeningTime (action) {
  try {
    const { values, parentFormName } = action.payload
    yield put(startSubmit(timeConstants.ADD_OPENING_TIME_FORM_NAME))
    yield call(validate, values, timeConstraints.OPENING_TIME_CONSTRAINT)

    const newOpeningTimes = yield call(
      getNewOpeningTimesFormValue,
      parentFormName,
      values
    )

    yield put(change(parentFormName, 'openingTimes', newOpeningTimes))
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

    const newAdditionalOpeningTimes = yield call(
      getNewAdditionalOpeningTimesFormValue,
      parentFormName,
      values
    )

    yield put(
      change(
        parentFormName,
        'additionalOpeningTimes',
        newAdditionalOpeningTimes
      )
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
    const newSpecialOpeningTimes = yield call(
      getNewSpecialOpeningTimesFormValue,
      parentFormName,
      values
    )

    yield put(
      change(parentFormName, 'specialOpeningTimes', newSpecialOpeningTimes)
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

    const newClosures = yield call(
      getNewOpeningTimesClosuresFormValue,
      parentFormName,
      values
    )

    yield put(change(parentFormName, 'openingTimesClosures', newClosures))
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

    const newPerformances = yield call(
      getNewPerformancesFormValue,
      parentFormName,
      values
    )

    yield put(change(parentFormName, 'performances', newPerformances))
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

    const newAdditionalPerformances = call(
      getNewAdditionalPerformancesFormValue,
      parentFormName,
      values
    )

    yield put(
      change(
        parentFormName,
        'additionalPerformances',
        newAdditionalPerformances
      )
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

    const newSpecialPerformances = yield call(
      getNewSpecialPerformancesFormValue,
      parentFormName,
      values
    )

    yield put(
      change(parentFormName, 'specialPerformances', newSpecialPerformances)
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

    const newClosures = yield call(
      getNewPerformancesClosuresFormValue,
      parentFormName,
      values
    )

    yield put(change(parentFormName, 'performancesClosures', newClosures))
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

    const newTimesRanges = yield call(
      getNewTimesRangesFormValue,
      parentFormName,
      values
    )

    yield put(change(parentFormName, 'timesRanges', newTimesRanges))
    yield put(reset(timeConstants.ADD_TIMES_RANGE_FORM_NAME))
    yield put(stopSubmit(timeConstants.ADD_TIMES_RANGE_FORM_NAME))
  } catch (err) {
    yield call(submitErrorHandler, err, timeConstants.ADD_TIMES_RANGE_FORM_NAME)
  }
}

export default [
  takeLatest(timeActions.types.ADD_OPENING_TIME, addOpeningTime),
  takeLatest(
    timeActions.types.ADD_ADDITIONAL_OPENING_TIME,
    addAdditionalOpeningTime
  ),
  takeLatest(timeActions.types.ADD_SPECIAL_OPENING_TIME, addSpecialOpeningTime),
  takeLatest(timeActions.types.ADD_OPENING_TIME_CLOSURE, addOpeningTimeClosure),
  takeLatest(timeActions.types.ADD_PERFORMANCE, addPerformance),
  takeLatest(
    timeActions.types.ADD_ADDITIONAL_PERFORMANCE,
    addAdditionalPerformance
  ),
  takeLatest(timeActions.types.ADD_SPECIAL_PERFORMANCE, addSpecialPerformance),
  takeLatest(timeActions.types.ADD_PERFORMANCE_CLOSURE, addPerformanceClosure),
  takeLatest(timeActions.types.ADD_TIMES_RANGE, addTimesRange)
]
