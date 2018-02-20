import { call } from 'redux-saga/effects'

import * as fetchLib from '_src/shared/lib/fetch'
import { getAuthTokenForCurrentUser } from '_src/modules/user'

const IMAGE_SERVICE_URL = `${process.env.WEBSITE_API_HOST_URL}/image-service`

export function * addImage (entityType, id, imageUrl, copyright, isMain) {
  const token = yield call(getAuthTokenForCurrentUser)
  const url = `${IMAGE_SERVICE_URL}/image/${id}`

  const json = yield call(
    fetchLib.put,
    url,
    { url: imageUrl, type: entityType },
    token
  )

  return {
    key: id,
    id: id,
    copyright,
    isMain,
    ratio: json.image.ratio,
    dominantColor: json.image.dominantColor
  }
}
