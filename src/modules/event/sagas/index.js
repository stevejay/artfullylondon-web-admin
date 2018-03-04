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

export default [takeLatest(eventActions.types.GET_SUB_ENTITY, getSubEntity)]
