import { takeLatest, call, put, select } from 'redux-saga/effects'
import {
  startSubmit,
  stopSubmit,
  reset,
  getFormValues,
  change,
  SubmissionError
} from 'redux-form'
import _ from 'lodash'

import { validate } from '_src/lib/validation'
import { submitErrorHandler } from '_src/lib/saga'
import normalise from '_src/lib/normalise'
import * as timeActions from '_src/modules/time/actions'
import * as timeConstants from '_src/modules/time/constants'
import * as timeConstraints from '_src/modules/time/constants/constraints'
import * as timeNormalisers from '_src/modules/time/constants/normalisers'
import * as dateLib from '_src/lib/date'

function * addOpeningTime (action) {
  try {
    yield put.resolve(startSubmit(timeConstants.ADD_OPENING_TIME_FORM_NAME))

    const { values, parentFormName } = action.payload
    yield call(validate, values, timeConstraints.OPENING_TIME_CONSTRAINT)

    const formValues = yield select(getFormValues(parentFormName))
    const openingTimes = formValues.openingTimes
    // const timesRanges = formValues.timesRanges;

    const newOpeningTime = {
      key: dateLib.createTimeKey(values),
      day: values.day,
      from: values.from,
      to: values.to,
      timesRangeId: values.timesRangeId
    }

    if (!isDayEntryAllowed(openingTimes, newOpeningTime)) {
      throw new SubmissionError({
        _error: 'These values overlap with one or more existing opening times.'
      })
    }

    let newOpeningTimes = openingTimes.slice()
    newOpeningTimes.push(newOpeningTime)
    newOpeningTimes = _.sortBy(newOpeningTimes, value => value.key)

    yield put.resolve(change(parentFormName, 'openingTimes', newOpeningTimes))
    yield put.resolve(stopSubmit(timeConstants.ADD_OPENING_TIME_FORM_NAME))
  } catch (err) {
    console.error('addOpeningTime error', err)
    yield call(
      submitErrorHandler,
      err,
      timeConstants.ADD_OPENING_TIME_FORM_NAME
    )
  }
}

function * addAdditionalOpeningTime (action) {
  try {
    yield put.resolve(
      startSubmit(timeConstants.ADD_ADDITIONAL_OPENING_TIME_FORM_NAME)
    )

    const { values, parentFormName } = action.payload
    yield call(
      validate,
      values,
      timeConstraints.ADDITIONAL_OPENING_TIME_CONSTRAINT
    )

    const formValues = yield select(getFormValues(parentFormName))
    const additionalOpeningTimes = formValues.additionalOpeningTimes

    const newAdditionalOpeningTime = {
      key: dateLib.createTimeKey(values),
      date: values.date,
      from: values.from,
      to: values.to
    }

    if (!isDateEntryAllowed(additionalOpeningTimes, newAdditionalOpeningTime)) {
      throw new SubmissionError({
        _error: 'These values overlap with one or more existing additional opening times.'
      })
    }

    let newAdditionalOpeningTimes = additionalOpeningTimes.slice()
    newAdditionalOpeningTimes.push(newAdditionalOpeningTime)
    newAdditionalOpeningTimes = _.sortBy(
      newAdditionalOpeningTimes,
      value => value.key
    )

    yield put.resolve(
      change(
        parentFormName,
        'additionalOpeningTimes',
        newAdditionalOpeningTimes
      )
    )

    yield put.resolve(
      stopSubmit(timeConstants.ADD_ADDITIONAL_OPENING_TIME_FORM_NAME)
    )
  } catch (err) {
    console.error('addAdditionalOpeningTime error', err)
    yield call(
      submitErrorHandler,
      err,
      timeConstants.ADD_ADDITIONAL_OPENING_TIME_FORM_NAME
    )
  }
}

function * addSpecialOpeningTime (action) {
  try {
    yield put.resolve(
      startSubmit(timeConstants.ADD_SPECIAL_OPENING_TIME_FORM_NAME)
    )

    const { values, parentFormName } = action.payload
    yield call(
      validate,
      values,
      timeConstraints.SPECIAL_OPENING_TIME_CONSTRAINT
    )

    const formValues = yield select(getFormValues(parentFormName))
    const specialOpeningTimes = formValues.specialOpeningTimes

    const newSpecialOpeningTime = {
      key: dateLib.createTimeKey(values),
      date: values.date,
      from: values.from,
      to: values.to,
      audienceTags: values.audienceTags
    }

    if (!isDateEntryAllowed(specialOpeningTimes, newSpecialOpeningTime)) {
      throw new SubmissionError({
        _error: 'These values overlap with one or more existing special opening times.'
      })
    }

    let newSpecialOpeningTimes = specialOpeningTimes.slice()
    newSpecialOpeningTimes.push(newSpecialOpeningTime)
    newSpecialOpeningTimes = _.sortBy(
      newSpecialOpeningTimes,
      value => value.key
    )

    yield put.resolve(
      change(parentFormName, 'specialOpeningTimes', newSpecialOpeningTimes)
    )

    yield put.resolve(
      stopSubmit(timeConstants.ADD_SPECIAL_OPENING_TIME_FORM_NAME)
    )
  } catch (err) {
    console.error('addSpecialOpeningTime error', err)
    yield call(
      submitErrorHandler,
      err,
      timeConstants.ADD_SPECIAL_OPENING_TIME_FORM_NAME
    )
  }
}

function * addOpeningTimeClosure (action) {
  try {
    yield put.resolve(
      startSubmit(timeConstants.ADD_OPENING_TIME_CLOSURE_FORM_NAME)
    )

    const { values, parentFormName } = action.payload
    yield call(
      validate,
      values,
      timeConstraints.OPENING_TIME_CLOSURE_CONSTRAINT
    )

    const formValues = yield select(getFormValues(parentFormName))
    const closures = formValues.openingTimesClosures

    const newClosure = {
      key: dateLib.createTimeKey(values),
      date: values.date
    }

    if (values.from) {
      newClosure.from = values.from
      newClosure.to = values.to
    }

    if (!isClosureAllowed(closures, newClosure)) {
      throw new SubmissionError({
        _error: 'These values overlap with one or more existing closures.'
      })
    }

    let newClosures = closures.slice()
    newClosures.push(newClosure)
    newClosures = _.sortBy(newClosures, value => value.key)

    yield put.resolve(
      change(parentFormName, 'openingTimesClosures', newClosures)
    )
    yield put.resolve(
      stopSubmit(timeConstants.ADD_OPENING_TIME_CLOSURE_FORM_NAME)
    )
  } catch (err) {
    console.error('addOpeningTimeClosure error', err)
    yield call(
      submitErrorHandler,
      err,
      timeConstants.ADD_OPENING_TIME_CLOSURE_FORM_NAME
    )
  }
}

function * addPerformance (action) {
  try {
    yield put.resolve(startSubmit(timeConstants.ADD_PERFORMANCE_FORM_NAME))

    const { values, parentFormName } = action.payload
    yield call(validate, values, timeConstraints.PERFORMANCE_CONSTRAINT)

    const formValues = yield select(getFormValues(parentFormName))
    const performances = formValues.performances

    const newPerformance = {
      key: dateLib.createTimeKey(values),
      day: values.day,
      at: values.at,
      timesRangeId: values.timesRangeId
    }

    if (!isDayEntryAllowed(performances, newPerformance)) {
      throw new SubmissionError({
        _error: 'These values coincide with one or more existing performances.'
      })
    }

    let newPerformances = performances.slice()
    newPerformances.push(newPerformance)
    newPerformances = _.sortBy(newPerformances, value => value.key)

    yield put.resolve(change(parentFormName, 'performances', newPerformances))
    yield put.resolve(stopSubmit(timeConstants.ADD_PERFORMANCE_FORM_NAME))
  } catch (err) {
    console.error('addPerformance error', err)
    yield call(submitErrorHandler, err, timeConstants.ADD_PERFORMANCE_FORM_NAME)
  }
}

function * addAdditionalPerformance (action) {
  try {
    yield put.resolve(
      startSubmit(timeConstants.ADD_ADDITIONAL_PERFORMANCE_FORM_NAME)
    )

    const { values, parentFormName } = action.payload
    yield call(
      validate,
      values,
      timeConstraints.ADDITIONAL_PERFORMANCE_CONSTRAINT
    )

    const formValues = yield select(getFormValues(parentFormName))
    const additionalPerformances = formValues.additionalPerformances

    const newAdditional = {
      key: dateLib.createTimeKey(values),
      date: values.date,
      at: values.at
    }

    if (!isDateEntryAllowed(additionalPerformances, newAdditional)) {
      throw new SubmissionError({
        _error: 'These values coincide with one or more existing additional performances.'
      })
    }

    let newAdditionalPerformances = additionalPerformances.slice()
    newAdditionalPerformances.push(newAdditional)
    newAdditionalPerformances = _.sortBy(
      newAdditionalPerformances,
      value => value.key
    )

    yield put.resolve(
      change(
        parentFormName,
        'additionalPerformances',
        newAdditionalPerformances
      )
    )

    yield put.resolve(
      stopSubmit(timeConstants.ADD_ADDITIONAL_PERFORMANCE_FORM_NAME)
    )
  } catch (err) {
    console.error('addAdditionalPerformance error', err)
    yield call(
      submitErrorHandler,
      err,
      timeConstants.ADD_ADDITIONAL_PERFORMANCE_FORM_NAME
    )
  }
}

function * addSpecialPerformance (action) {
  try {
    yield put.resolve(
      startSubmit(timeConstants.ADD_SPECIAL_PERFORMANCE_FORM_NAME)
    )

    const { values, parentFormName } = action.payload
    yield call(
      validate,
      values,
      timeConstraints.SPECIAL_PERFORMANCES_CONSTRAINT
    )

    const formValues = yield select(getFormValues(parentFormName))
    const specialPerformances = formValues.specialPerformances

    const newSpecialPerformance = {
      key: dateLib.createTimeKey(values),
      date: values.date,
      at: values.at,
      audienceTags: values.audienceTags
    }

    if (!isDateEntryAllowed(specialPerformances, newSpecialPerformance)) {
      throw new SubmissionError({
        _error: 'These values coincide with one or more existing special performances.'
      })
    }

    let newSpecialPerformances = specialPerformances.slice()
    newSpecialPerformances.push(newSpecialPerformance)
    newSpecialPerformances = _.sortBy(
      newSpecialPerformances,
      value => value.key
    )

    yield put.resolve(
      change(parentFormName, 'specialPerformances', newSpecialPerformances)
    )

    yield put.resolve(
      stopSubmit(timeConstants.ADD_SPECIAL_PERFORMANCE_FORM_NAME)
    )
  } catch (err) {
    console.error('addSpecialPerformance error', err)
    yield call(
      submitErrorHandler,
      err,
      timeConstants.ADD_SPECIAL_PERFORMANCE_FORM_NAME
    )
  }
}

function * addPerformanceClosure (action) {
  try {
    yield put.resolve(
      startSubmit(timeConstants.ADD_PERFORMANCE_CLOSURE_FORM_NAME)
    )

    const { values, parentFormName } = action.payload
    yield call(validate, values, timeConstraints.PERFORMANCE_CLOSURE_CONSTRAINT)

    const formValues = yield select(getFormValues(parentFormName))
    const closures = formValues.performancesClosures

    const newClosure = {
      key: dateLib.createTimeKey(values),
      date: values.date
    }

    if (values.at) {
      newClosure.at = values.at
    }

    if (!isClosureAllowed(closures, newClosure)) {
      throw new SubmissionError({
        _error: 'These values overlap with one or more existing closures.'
      })
    }

    let newClosures = closures.slice()
    newClosures.push(newClosure)
    newClosures = _.sortBy(newClosures, value => value.key)

    yield put.resolve(
      change(parentFormName, 'performancesClosures', newClosures)
    )

    yield put.resolve(
      stopSubmit(timeConstants.ADD_PERFORMANCE_CLOSURE_FORM_NAME)
    )
  } catch (err) {
    console.error('addPerformanceClosure error', err)
    yield call(
      submitErrorHandler,
      err,
      timeConstants.ADD_PERFORMANCE_CLOSURE_FORM_NAME
    )
  }
}

function * addTimesRange (action) {
  try {
    yield put.resolve(startSubmit(timeConstants.ADD_TIMES_RANGE_FORM_NAME))
    const { parentFormName } = action.payload

    const values = yield call(
      normalise,
      action.payload.values,
      timeNormalisers.TIMES_RANGE_NORMALISER
    )

    yield call(validate, values, timeConstraints.TIMES_RANGE_CONSTRAINT)

    const formValues = yield select(getFormValues(parentFormName))
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

    if (!isTimesRangeAllowed(timesRanges, newTimesRange)) {
      throw new SubmissionError({
        _error: 'These values overlap with one or more existing times ranges.'
      })
    }

    let newTimesRanges = timesRanges.slice()
    newTimesRanges.push(newTimesRange)
    newTimesRanges = _.sortBy(newTimesRanges, value => value.dateFrom)

    yield put.resolve(change(parentFormName, 'timesRanges', newTimesRanges))

    yield put.resolve(reset(timeConstants.ADD_TIMES_RANGE_FORM_NAME))
    yield put.resolve(stopSubmit(timeConstants.ADD_TIMES_RANGE_FORM_NAME))
  } catch (err) {
    console.error('addTimesRange error', err)
    yield call(submitErrorHandler, err, timeConstants.ADD_TIMES_RANGE_FORM_NAME)
  }
}

function isClosureAllowed (existingClosures, newClosure) {
  const dateMatches = existingClosures.filter(x => x.date === newClosure.date)

  // There are no existing closures for this date.
  if (dateMatches.length === 0) {
    return true
  }

  // We are trying to add one that can only be by itself.
  const hasTime = newClosure.from || newClosure.at
  if (!hasTime) {
    return false
  }

  // There is an existing closure that can only be by itself.
  if (dateMatches.findIndex(x => !x.from && !x.at) > -1) {
    return false
  }

  return (
    dateMatches.findIndex(
      x =>
        (newClosure.at && newClosure.at === x.at) ||
        (newClosure.from && newClosure.from < x.to && newClosure.to > x.from)
    ) === -1
  )
}

function isDayEntryAllowed (existingTimes, newTime) {
  const dayMatches = existingTimes.filter(
    x =>
      x.day === newTime.day &&
      (!newTime.timesRangeId || newTime.timesRangeId === x.timesRangeId)
  )

  // There are no existing times for this day (including times range id if it exists).
  if (dayMatches.length === 0) {
    return true
  }

  return (
    dayMatches.findIndex(
      x =>
        (newTime.at && newTime.at === x.at) ||
        (newTime.from && newTime.from < x.to && newTime.to > x.from)
    ) === -1
  )
}

function isDateEntryAllowed (existingTimes, newTime) {
  const dateMatches = existingTimes.filter(x => x.date === newTime.date)

  // There are no existing times for this day.
  if (dateMatches.length === 0) {
    return true
  }

  return (
    dateMatches.findIndex(
      x =>
        (newTime.at && newTime.at === x.at) ||
        (newTime.from && newTime.from < x.to && newTime.to > x.from)
    ) === -1
  )
}

function isTimesRangeAllowed (existingTimesRanges, newTimesRange) {
  return (
    existingTimesRanges.findIndex(
      x =>
        (newTimesRange.dateFrom <= x.dateTo &&
          newTimesRange.dateTo >= x.dateFrom) ||
        (newTimesRange.label && x.label === newTimesRange.label)
    ) === -1
  )
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
