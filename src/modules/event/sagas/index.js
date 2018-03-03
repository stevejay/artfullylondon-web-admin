import _ from 'lodash'
import { call, put, takeLatest } from 'redux-saga/effects'
import { change } from 'redux-form'
import log from 'loglevel'

import * as sagaLib from '_src/shared/lib/saga'
import * as eventActions from '../actions'
import * as entityFactory from '_src/domain/entity-factory'
import { eventService } from '_src/modules/api'
import { actions as notificationActions } from '_src/modules/notification'

export function * getSubEntity ({ payload, meta }) {
  const { subEntityType, id, parentFormName } = payload

  try {
    const entity = yield call(eventService.getSummaryEntity, subEntityType, id)
    const result = entityFactory.createSummaryEntity(subEntityType, entity)
    yield put(change(parentFormName, _.camelCase(subEntityType), result))
    yield put(sagaLib.returnAsPromise(null, meta))
  } catch (err) {
    yield call(log.error, err)

    yield put(
      notificationActions.addErrorNotification(
        'Load Failed',
        `Failed to load ${subEntityType} entity`
      )
    )
  }
}

// TODO Delete when I can:

// function * getEventAsCopy (action) {
//   const { id } = action.payload

//   try {
//     yield put({ type: entityActionTypes.GET_EVENT_AS_COPY_STARTED })

//     const token = yield call(getAuthTokenForCurrentUser)
//     const url = `${process.env.WEBSITE_API_HOST_URL}/event-service/admin/edit/event/${id}`
//     const json = yield call(get, url, token)

//     yield put({
//       type: entityActionTypes.GET_EVENT_AS_COPY_SUCCEEDED,
//       payload: { entity: json.entity }
//     })
//   } catch (err) {
//     yield call(log.error, err)

//     yield put({
//       type: entityActionTypes.GET_EVENT_AS_COPY_FAILED,
//       payload: { statusCode: err.statusCode || 500 }
//     })
//   }
// }

export default [
  takeLatest(eventActions.types.GET_SUB_ENTITY, getSubEntity)
  // takeLatest(entityActionTypes.GET_EVENT_AS_COPY, getEventAsCopy)
]
