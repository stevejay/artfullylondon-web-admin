import { call, put, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import log from 'loglevel'

import normalise from '_src/shared/lib/normalise'
import history from '_src/shared/lib/history'
import { eventService } from '_src/modules/api'
import * as sagaLib from '_src/shared/lib/saga'
import * as validationLib from '_src/shared/lib/validation'
import * as entityActions from '../actions'
import { actions as notificationActions } from '_src/modules/notification'

export function * getEntity (action) {
  const { entityType, id } = action.payload

  try {
    yield put(entityActions.clearEntity())
    yield put(entityActions.getEntityStarted(id))
    const entity = yield call(eventService.getEntity, entityType, id)
    yield put(entityActions.getEntitySucceeded(entityType, entity))
  } catch (err) {
    yield call(log.error, err)
    yield put(entityActions.getEntityFailed())
  }
}

export function * copyEntity (action) {
  const { entityType, id } = action.payload

  try {
    yield put(entityActions.clearEntity())
    yield put(entityActions.getEntityStarted(null))
    const entity = yield call(eventService.getEntity, entityType, id)

    delete entity.id
    delete entity.name
    delete entity.firstNames
    delete entity.lastName

    yield put(entityActions.getEntitySucceeded(entityType, entity))
  } catch (err) {
    yield call(log.error, err)
    yield put(entityActions.getEntityFailed())
  }
}

export function * saveEntity ({
  payload: {
    entityType,
    values: payloadValues,
    isEdit, // TODO infer from having no id in payload.values?
    formName,
    normaliser,
    constraint,
    mapper
  }
}) {
  try {
    yield put(startSubmit(formName))
    const values = yield call(normalise, payloadValues, normaliser)
    yield call(validationLib.validate, values, constraint)

    const entity = yield call(
      eventService.saveEntity,
      entityType,
      values,
      mapper,
      isEdit
    )

    yield put(stopSubmit(formName))
    yield call(history.push, `/${entityType}/${entity.id}`)
  } catch (err) {
    yield call(log.error, err)
    yield put(
      notificationActions.addErrorNotification('Save Failed', err.message)
    )
    yield call(sagaLib.submitErrorHandler, err, formName)
  }
}

export default [
  takeLatest(entityActions.types.GET_ENTITY, getEntity),
  takeLatest(entityActions.types.SAVE_ENTITY, saveEntity),
  takeLatest(entityActions.types.COPY_ENTITY, copyEntity)
]
