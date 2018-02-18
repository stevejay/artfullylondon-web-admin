import { call } from 'redux-saga/effects'

import * as fetchLib from '_src/lib/fetch'
import { getAuthTokenForCurrentUser } from '_src/modules/user'

const MONITOR_SERVICE_URL = `${process.env.WEBSITE_API_HOST_URL}/monitor-service`

export function * getVenueEventMonitors (venueId) {
  const token = yield call(getAuthTokenForCurrentUser)
  const url = `${MONITOR_SERVICE_URL}/monitor/venue/${venueId}/event/`
  const json = yield call(fetchLib.get, url, token)

  json.items.forEach(item => {
    item.key = item.externalEventId
  })

  return json.items
}

export function * updateVenueEventMonitor (values) {
  const token = yield call(getAuthTokenForCurrentUser)
  const url = `${MONITOR_SERVICE_URL}/monitor/venue/${values.venueId}/event/${encodeURIComponent(values.externalEventId)}`

  const body = {
    hasChanged: values.hasChanged,
    isIgnored: values.isIgnored
  }

  yield call(fetchLib.put, url, body, token)
}

export function * getVenueMonitors (venueId) {
  const token = yield call(getAuthTokenForCurrentUser)
  const url = `${MONITOR_SERVICE_URL}/monitor/venue/${venueId}`
  const json = yield call(fetchLib.get, url, token)

  json.items.forEach(item => {
    item.key = item.venueId
  })

  return json.items
}

export function * updateVenueMonitor (values) {
  const token = yield call(getAuthTokenForCurrentUser)
  const url = `${MONITOR_SERVICE_URL}/monitor/venue/${values.venueId}`

  const body = {
    hasChanged: values.hasChanged,
    isIgnored: values.isIgnored
  }

  yield call(fetchLib.put, url, body, token)
}
