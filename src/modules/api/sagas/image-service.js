import { call } from 'redux-saga/effects'

import * as fetchLib from '_src/lib/fetch'
import { getAuthTokenForCurrentUser } from '_src/modules/user'

const IMAGE_SERVICE_URL = `${process.env.WEBSITE_API_HOST_URL}/image-service`

export function * addImage (entityType, id, imageUrl) {
  const token = yield call(getAuthTokenForCurrentUser)
  const url = `${IMAGE_SERVICE_URL}/image/${id}`

  const json = call(
    fetchLib.put,
    url,
    { url: imageUrl, type: entityType },
    token
  )

  return json.image
}
