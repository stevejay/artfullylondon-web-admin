import { call } from 'redux-saga/effects'

import * as fetchLib from '_src/shared/lib/fetch'
import { getAuthTokenForCurrentUser } from '_src/modules/user'

const EVENT_SERVICE_URL = `${process.env.WEBSITE_API_HOST_URL}/event-service`

export function * getEntity (entityType, id) {
  const token = yield call(getAuthTokenForCurrentUser)
  const url = `${EVENT_SERVICE_URL}/admin/edit/${entityType}/${id}`
  const json = yield call(fetchLib.get, url, token)
  return json.entity
}

export function * saveEntity (entityType, values, mapper, isEdit) {
  const token = yield call(getAuthTokenForCurrentUser)
  let json = null

  if (isEdit) {
    const url = `${EVENT_SERVICE_URL}/admin/${entityType}/${values.id}`
    json = yield call(fetchLib.put, url, mapper(values), token)
  } else {
    const url = `${EVENT_SERVICE_URL}/admin/${entityType}`
    json = yield call(fetchLib.post, url, mapper(values), token)
  }

  return json.entity
}
