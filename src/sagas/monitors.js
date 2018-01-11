import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import { get, put as httpPut } from '_src/lib/fetch'
import { submitErrorHandler } from '_src/lib/saga'
import { validate } from '_src/lib/validation'
import * as modalTypes from '_src/constants/modal'
import { UPDATE_MONITOR_FORM_NAME } from '_src/constants/form'
import monitorsConstraint from '_src/constants/monitors-constraint'
import { getAuthTokenForCurrentUser } from '_src/lib/auth'
import * as types from '_src/constants/monitors'

function * getVenueEventMonitors (action) {
  try {
    const { venueId } = action.payload
    yield put.resolve({ type: types.GET_VENUE_EVENT_MONITORS_STARTED })

    const token = yield getAuthTokenForCurrentUser()
    const url = `${process.env.WEBSITE_API_HOST_URL}/monitor-service/monitor/venue/${venueId}/event/`
    const json = yield call(get, url, token)

    yield put.resolve({
      type: types.GET_VENUE_EVENT_MONITORS_SUCCEEDED,
      payload: json
    })
  } catch (err) {
    console.error('getVenueEventMonitors failed: ', err)
    yield put.resolve({ type: types.GET_VENUE_EVENT_MONITORS_FAILED })
  }
}

function * getVenueEventMonitor (action) {
  try {
    const { venueId, externalEventId } = action.payload
    yield put.resolve({ type: types.GET_VENUE_EVENT_MONITOR_STARTED })

    const token = yield getAuthTokenForCurrentUser()
    const url = `${process.env.WEBSITE_API_HOST_URL}/monitor-service/monitor/venue/${venueId}/event/${encodeURIComponent(externalEventId)}`
    const json = yield call(get, url, token)

    yield put.resolve({
      type: types.GET_VENUE_EVENT_MONITOR_SUCCEEDED,
      payload: json
    })
  } catch (err) {
    console.error('getVenueEventMonitor failed: ', err)
    yield put.resolve({ type: types.GET_VENUE_EVENT_MONITOR_FAILED })
  }
}

function * getVenueMonitor (action) {
  try {
    const { venueId } = action.payload
    yield put.resolve({ type: types.GET_VENUE_MONITOR_STARTED })

    const token = yield getAuthTokenForCurrentUser()
    const url = `${process.env.WEBSITE_API_HOST_URL}/monitor-service/monitor/venue/${venueId}`
    const json = yield call(get, url, token)

    yield put.resolve({
      type: types.GET_VENUE_MONITOR_SUCCEEDED,
      payload: json
    })
  } catch (err) {
    if (err.statusCode !== 404) {
      console.error('getVenueMonitor failed: ', err)
    }

    yield put.resolve({ type: types.GET_VENUE_MONITOR_FAILED })
  }
}

function * updateVenueEventMonitor (action) {
  try {
    const values = action.payload
    yield put.resolve(startSubmit(UPDATE_MONITOR_FORM_NAME))
    yield call(validate, values, monitorsConstraint)

    const token = yield getAuthTokenForCurrentUser()
    const url = `${process.env.WEBSITE_API_HOST_URL}/monitor-service/monitor/venue/${values.venueId}/event/${encodeURIComponent(values.externalEventId)}`

    const payload = {
      hasChanged: values.hasChanged,
      isIgnored: values.isIgnored
    }

    yield call(httpPut, url, payload, token)

    yield put.resolve({
      type: types.UPDATE_VENUE_EVENT_MONITOR_SUCCEEDED,
      payload: values
    })

    yield put.resolve(stopSubmit(UPDATE_MONITOR_FORM_NAME))
    yield put.resolve({ type: modalTypes.HIDE_MODAL })
  } catch (err) {
    console.error('updateVenueEventMonitor failed: ', err)
    yield call(submitErrorHandler, err, UPDATE_MONITOR_FORM_NAME)
  }
}

function * updateVenueMonitor (action) {
  try {
    const values = action.payload
    yield put.resolve(startSubmit(UPDATE_MONITOR_FORM_NAME))
    yield call(validate, values, monitorsConstraint)

    const token = yield getAuthTokenForCurrentUser()
    const url = `${process.env.WEBSITE_API_HOST_URL}/monitor-service/monitor/venue/${values.venueId}`

    const payload = {
      hasChanged: values.hasChanged,
      isIgnored: values.isIgnored
    }

    yield call(httpPut, url, payload, token)

    yield put.resolve({
      type: types.UPDATE_VENUE_MONITOR_SUCCEEDED,
      payload: values
    })

    yield put.resolve(stopSubmit(UPDATE_MONITOR_FORM_NAME))
    yield put.resolve({ type: modalTypes.HIDE_MODAL })
  } catch (err) {
    console.error('updateVenueMonitor failed: ', err)
    yield call(submitErrorHandler, err, UPDATE_MONITOR_FORM_NAME)
  }
}

export default [
  takeLatest(types.GET_VENUE_EVENT_MONITORS, getVenueEventMonitors),
  takeLatest(types.GET_VENUE_EVENT_MONITOR, getVenueEventMonitor),
  takeEvery(types.UPDATE_VENUE_EVENT_MONITOR, updateVenueEventMonitor),

  takeLatest(types.GET_VENUE_MONITOR, getVenueMonitor),
  takeEvery(types.UPDATE_VENUE_MONITOR, updateVenueMonitor)
]
