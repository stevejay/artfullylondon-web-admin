import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import log from 'loglevel'

import * as sagaLib from '_src/shared/lib/saga'
import * as validationLib from '_src/shared/lib/validation'
import * as monitorConstants from '../constants'
import * as monitorActions from '../actions'
import { monitorService } from '_src/modules/api'

export function * getVenueEventMonitors (action) {
  try {
    const { venueId } = action.payload
    yield put(monitorActions.getVenueEventMonitorsStarted())
    const items = yield call(monitorService.getVenueEventMonitors, venueId)
    yield put(monitorActions.getVenueEventMonitorsSucceeded(items))
  } catch (err) {
    yield call(log.error, err)
    yield put(monitorActions.getVenueEventMonitorsFailed())
  }
}

export function * updateVenueEventMonitor ({ payload: { values }, meta }) {
  try {
    yield put(startSubmit(monitorConstants.UPDATE_MONITOR_FORM_NAME))

    yield call(
      validationLib.validate,
      values,
      monitorConstants.MONITOR_CONSTRAINT
    )

    yield call(monitorService.updateVenueEventMonitor, values)
    yield put(monitorActions.updateVenueEventMonitorSucceeded(values))
    yield put(stopSubmit(monitorConstants.UPDATE_MONITOR_FORM_NAME))
    yield put(sagaLib.returnAsPromise(null, meta))
  } catch (err) {
    yield call(log.error, err)

    yield call(
      sagaLib.submitErrorHandler,
      err,
      monitorConstants.UPDATE_MONITOR_FORM_NAME
    )
  }
}

export function * getVenueMonitors (action) {
  try {
    const { venueId } = action.payload
    yield put(monitorActions.getVenueMonitorsStarted())
    const items = yield call(monitorService.getVenueMonitors, venueId)
    yield put(monitorActions.getVenueMonitorsSucceeded(items))
  } catch (err) {
    if (err.statusCode !== 404) {
      yield call(log.error, err)
    }

    yield put(monitorActions.getVenueMonitorsFailed())
  }
}

export function * updateVenueMonitor ({ payload: { values }, meta }) {
  try {
    yield put(startSubmit(monitorConstants.UPDATE_MONITOR_FORM_NAME))

    yield call(
      validationLib.validate,
      values,
      monitorConstants.MONITOR_CONSTRAINT
    )

    yield call(monitorService.updateVenueMonitor, values)
    yield put(monitorActions.updateVenueMonitorSucceeded(values))
    yield put(stopSubmit(monitorConstants.UPDATE_MONITOR_FORM_NAME))
    yield put(sagaLib.returnAsPromise(null, meta))
  } catch (err) {
    yield call(log.error, err)

    yield call(
      sagaLib.submitErrorHandler,
      err,
      monitorConstants.UPDATE_MONITOR_FORM_NAME
    )
  }
}

export default [
  takeLatest(
    monitorActions.types.GET_VENUE_EVENT_MONITORS,
    getVenueEventMonitors
  ),
  takeEvery(
    monitorActions.types.UPDATE_VENUE_EVENT_MONITOR,
    updateVenueEventMonitor
  ),
  takeLatest(monitorActions.types.GET_VENUE_MONITORS, getVenueMonitors),
  takeEvery(monitorActions.types.UPDATE_VENUE_MONITOR, updateVenueMonitor)
]
