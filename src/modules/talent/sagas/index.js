import { call, put, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset, arrayPush } from 'redux-form'
import log from 'loglevel'

import * as sagaLib from '_src/shared/lib/saga'
import * as validationLib from '_src/shared/lib/validation'
import * as talentActions from '../actions'
import * as talentConstants from '../constants'
import * as talentMapper from '../lib/mapper'
import entityType from '_src/domain/types/entity-type'
import normalise from '_src/shared/lib/normalise'
import { eventService } from '_src/modules/api'
import { actions as notificationActions } from '_src/modules/notification'

export function * createTalentForEntity ({
  payload: { values: payloadValues, parentFormName },
  meta
}) {
  try {
    yield put(startSubmit(talentConstants.EDIT_TALENT_FORM_NAME))

    const values = yield call(
      normalise,
      payloadValues,
      talentConstants.TALENT_NORMALISER
    )

    yield call(
      validationLib.validate,
      values,
      talentConstants.TALENT_CONSTRAINT
    )

    const entity = yield call(
      eventService.saveEntity,
      entityType.TALENT,
      values,
      talentMapper.mapSubmittedValues,
      false
    )

    const newTalent = {
      ...entity,
      key: entity.id,
      roles: entity.commonRole,
      characters: ''
    }

    yield put(arrayPush(parentFormName, 'talents', newTalent))
    yield put(stopSubmit(talentConstants.EDIT_TALENT_FORM_NAME))
    yield put(reset(talentConstants.EDIT_TALENT_FORM_NAME))
    yield put(sagaLib.returnAsPromise(null, meta))
  } catch (err) {
    yield call(log.error, err)

    yield put(
      notificationActions.addErrorNotification('Save Failed', err.message)
    )

    yield call(
      sagaLib.submitErrorHandler,
      err,
      talentConstants.EDIT_TALENT_FORM_NAME
    )
  }
}

export default [
  takeLatest(
    talentActions.types.CREATE_TALENT_FOR_ENTITY,
    createTalentForEntity
  )
]
