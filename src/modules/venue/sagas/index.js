import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import log from 'loglevel'

import { get, put as httpPut } from '_src/lib/fetch'
import * as sagaLib from '_src/lib/saga'
import * as validationLib from '_src/lib/validation'
import { getAuthTokenForCurrentUser } from '_src/modules/user'
import * as venueConstants from '_src/modules/venue/constants'
import * as venueActions from '_src/modules/venue/actions'

export function * getVenueEventMonitors (action) {
  try {
    const { venueId } = action.payload
    yield put(venueActions.getVenueEventMonitorsStarted())

    const token = yield call(getAuthTokenForCurrentUser)
    const url = `${process.env.WEBSITE_API_HOST_URL}/monitor-service/monitor/venue/${venueId}/event/`
    const json = yield call(get, url, token)

    json.items.forEach(element => {
      element.key = element.externalEventId
    })

    yield put(venueActions.getVenueEventMonitorsSucceeded(json.items))
  } catch (err) {
    yield call(log.error, err)
    yield put(venueActions.getVenueEventMonitorsFailed)
  }
}

// export function * getVenueEventMonitor (action) {
//   try {
//     const { venueId, externalEventId } = action.payload
//     yield put(venueActions.getVenueEventMonitorStarted())

//     const token = yield call(getAuthTokenForCurrentUser)
//     const url = `${process.env.WEBSITE_API_HOST_URL}/monitor-service/monitor/venue/${venueId}/event/${encodeURIComponent(externalEventId)}`
//     const json = yield call(get, url, token)

//     yield put(venueActions.getVenueEventMonitorSucceeded(json))
//   } catch (err) {
//     yield call(log.error, err)
//     yield put(venueActions.getVenueEventMonitorFailed())
//   }
// }

export function * updateVenueEventMonitor ({ payload: { values }, meta }) {
  try {
    yield put(startSubmit(venueConstants.UPDATE_MONITOR_FORM_NAME))

    yield call(
      validationLib.validate,
      values,
      venueConstants.MONITOR_CONSTRAINT
    )

    const token = yield call(getAuthTokenForCurrentUser)
    const url = `${process.env.WEBSITE_API_HOST_URL}/monitor-service/monitor/venue/${values.venueId}/event/${encodeURIComponent(values.externalEventId)}`

    const body = {
      hasChanged: values.hasChanged,
      isIgnored: values.isIgnored
    }

    yield call(httpPut, url, body, token)
    yield put(venueActions.updateVenueEventMonitorSucceeded(values))
    yield put(stopSubmit(venueConstants.UPDATE_MONITOR_FORM_NAME))
    yield put(sagaLib.returnAsPromise(null, meta))
  } catch (err) {
    yield call(log.error, err)

    yield call(
      sagaLib.submitErrorHandler,
      err,
      venueConstants.UPDATE_MONITOR_FORM_NAME
    )
  }
}

export function * getVenueMonitor (action) {
  try {
    const { venueId } = action.payload
    yield put(venueActions.getVenueMonitorStarted())

    const token = yield call(getAuthTokenForCurrentUser)
    const url = `${process.env.WEBSITE_API_HOST_URL}/monitor-service/monitor/venue/${venueId}`
    const json = yield call(get, url, token)

    const entity = json.entity
    entity.key = entity.venueId
    yield put(venueActions.getVenueMonitorSucceeded(entity))
  } catch (err) {
    if (err.statusCode !== 404) {
      yield call(log.error, err)
    }

    yield put(venueActions.getVenueMonitorFailed())
  }
}

export function * updateVenueMonitor ({ payload: { values }, meta }) {
  try {
    yield put(startSubmit(venueConstants.UPDATE_MONITOR_FORM_NAME))

    yield call(
      validationLib.validate,
      values,
      venueConstants.MONITOR_CONSTRAINT
    )

    const token = yield call(getAuthTokenForCurrentUser)
    const url = `${process.env.WEBSITE_API_HOST_URL}/monitor-service/monitor/venue/${values.venueId}`

    const body = {
      hasChanged: values.hasChanged,
      isIgnored: values.isIgnored
    }

    yield call(httpPut, url, body, token)
    yield put(venueActions.updateVenueMonitorSucceeded(values))
    yield put(stopSubmit(venueConstants.UPDATE_MONITOR_FORM_NAME))
    yield put(sagaLib.returnAsPromise(null, meta))
  } catch (err) {
    yield call(log.error, err)

    yield call(
      sagaLib.submitErrorHandler,
      err,
      venueConstants.UPDATE_MONITOR_FORM_NAME
    )
  }
}

export default [
  takeLatest(
    venueActions.types.GET_VENUE_EVENT_MONITORS,
    getVenueEventMonitors
  ),
  // takeLatest(venueActions.types.GET_VENUE_EVENT_MONITOR, getVenueEventMonitor),
  takeEvery(
    venueActions.types.UPDATE_VENUE_EVENT_MONITOR,
    updateVenueEventMonitor
  ),
  takeLatest(venueActions.types.GET_VENUE_MONITOR, getVenueMonitor),
  takeEvery(venueActions.types.UPDATE_VENUE_MONITOR, updateVenueMonitor)
]
