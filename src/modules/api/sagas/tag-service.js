import { call } from 'redux-saga/effects'

import * as fetchLib from '_src/lib/fetch'
import { getAuthTokenForCurrentUser } from '_src/modules/user'

const TAG_SERVICE_URL = `${process.env.WEBSITE_API_HOST_URL}/tag-service`

export function * getTags (tagType) {
  const token = yield call(getAuthTokenForCurrentUser)
  const url = `${TAG_SERVICE_URL}/tags/${tagType}`
  const json = call(fetchLib.get, url, token)
  return json.tags[tagType] || []
}

export function * addTag (values) {
  const { tagType, label } = values
  const token = yield call(getAuthTokenForCurrentUser)
  const url = `${TAG_SERVICE_URL}/tag/${tagType}`
  const json = call(fetchLib.post, url, { label }, token)
  return json.tag
}

export function * deleteTag (id) {
  const token = yield call(getAuthTokenForCurrentUser)
  const url = `${TAG_SERVICE_URL}/tag/${id}`
  yield call(fetchLib.httpDelete, url, token)
}
