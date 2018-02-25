import { put, call, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import log from 'loglevel'

import normalise from '_src/shared/lib/normalise'
import * as tagConstants from '../constants'
import * as sagaLib from '_src/shared/lib/saga'
import * as validationLib from '_src/shared/lib/validation'
import * as tagActions from '../actions'
import { tagService } from '_src/modules/api'

export function * getTags (action) {
  try {
    const tagType = action.payload.tagType
    yield put(tagActions.getTagsStarted())
    const tags = yield call(tagService.getTags, tagType)
    yield put(tagActions.getTagsSucceeded(tags, tagType))
  } catch (err) {
    yield call(log.error, err)
    yield put(tagActions.getTagsFailed())
  }
}

export function * addTag ({ payload, meta }) {
  try {
    yield put(startSubmit(tagConstants.TAG_EDITOR_FORM_NAME))
    yield put(tagActions.addTagStarted())
    const values = yield call(normalise, payload, tagConstants.NORMALISER)
    yield call(validationLib.validate, values, tagConstants.CONSTRAINT)
    const tag = yield call(tagService.addTag, values)
    yield put(tagActions.addTagSucceeded(tag, values.tagType))
    yield put(stopSubmit(tagConstants.TAG_EDITOR_FORM_NAME))
    yield put(reset(tagConstants.TAG_EDITOR_FORM_NAME))
    yield put(sagaLib.returnAsPromise(tag, meta))
  } catch (err) {
    yield call(log.error, err)
    yield put(tagActions.addTagFailed())

    const payload = err.message === '[400] Stale Data'
      ? { label: 'A tag with this label already exists' }
      : err

    yield call(
      sagaLib.submitErrorHandler,
      payload,
      tagConstants.TAG_EDITOR_FORM_NAME
    )
  }
}

export function * deleteTag (action) {
  try {
    const { id } = action.payload
    yield put(tagActions.deleteTagStarted())
    yield call(tagService.deleteTag, id)
    yield put(tagActions.deleteTagSucceeded(id))
  } catch (err) {
    yield call(log.error, err)
    yield put(tagActions.deleteTagFailed())
  }
}

export default [
  takeLatest(tagActions.types.GET_TAGS, getTags),
  takeLatest(tagActions.types.ADD_TAG, addTag),
  takeLatest(tagActions.types.DELETE_TAG, deleteTag)
]
