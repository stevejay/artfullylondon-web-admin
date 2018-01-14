import { put, call, takeLatest, select } from 'redux-saga/effects'
import {
  startSubmit,
  stopSubmit,
  reset,
  getFormValues,
  change
} from 'redux-form'
import { submitErrorHandler } from '_src/lib/saga'
import { get, post, httpDelete } from '_src/lib/fetch'
import { validate } from '_src/lib/validation'
import normalise from '_src/lib/normalise'
import * as tagConstants from '_src/constants/tag'
import * as modalTypes from '_src/constants/modal'
import {
  TAG_EDITOR_FORM_NAME,
  EDIT_EVENT_TAGS_FORM_NAME
} from '_src/constants/form'
import { getAuthTokenForCurrentUser } from '_src/lib/auth'
import tagConstraint from '_src/constants/tag-constraint'
import tagNormaliser from '_src/constants/tag-normaliser'

function * getAllTags () {
  try {
    yield put.resolve({ type: tagConstants.GET_TAGS_STARTING })
    const token = yield getAuthTokenForCurrentUser()
    const url = process.env.WEBSITE_API_HOST_URL + '/tag-service/tags'
    const json = yield call(get, url, token)
    yield put.resolve({ type: tagConstants.GET_TAGS_SUCCEEDED, payload: json })
  } catch (err) {
    console.error('error in getAllTags: ' + err.message)
    yield put.resolve({ type: tagConstants.GET_TAGS_FAILED })
  }
}

function * getTags (action) {
  try {
    yield put.resolve({ type: tagConstants.GET_TAGS_STARTING })
    const token = yield getAuthTokenForCurrentUser()
    const tagType = action.payload.tagType
    const url =
      process.env.WEBSITE_API_HOST_URL + '/tag-service/tags/' + tagType
    const json = yield call(get, url, token)
    yield put.resolve({ type: tagConstants.GET_TAGS_SUCCEEDED, payload: json })
  } catch (err) {
    console.error('error in getTags: ' + err.message)
    yield put.resolve({ type: tagConstants.GET_TAGS_FAILED })
  }
}

function * addTag (action) {
  try {
    yield put.resolve(startSubmit(TAG_EDITOR_FORM_NAME))
    yield put.resolve({ type: tagConstants.ADD_TAG_STARTING })

    const values = yield call(normalise, action.payload, tagNormaliser)
    yield call(validate, values, tagConstraint)

    const token = yield getAuthTokenForCurrentUser()
    const { tagType, label } = action.payload
    const url = `${process.env.WEBSITE_API_HOST_URL}/tag-service/tag/${tagType}`
    const json = yield call(post, url, { label }, token)
    const newTag = { tagType, tag: json.tag }
    yield put.resolve({ type: tagConstants.ADD_TAG_SUCCEEDED, payload: newTag })

    if (action.payload.addTagForEvent) {
      const propertyName = getEventTagsPropertyName(tagType)
      const formValues = yield select(getFormValues(EDIT_EVENT_TAGS_FORM_NAME))
      const tags = formValues[propertyName]

      if (tags.indexOf(x => x.id === json.tag.id) === -1) {
        const newTags = tags.slice()
        newTags.push(json.tag)
        yield put.resolve(
          change(EDIT_EVENT_TAGS_FORM_NAME, propertyName, newTags)
        )
      }
    }

    yield put.resolve(stopSubmit(TAG_EDITOR_FORM_NAME))
    yield put.resolve(reset(TAG_EDITOR_FORM_NAME))
    yield put.resolve({ type: modalTypes.HIDE_MODAL })
  } catch (err) {
    console.error('error in addTag: ' + err.message)
    yield put.resolve({ type: tagConstants.ADD_TAG_FAILED })

    if (err.message === '[400] Stale Data') {
      const errors = { label: 'A tag with this label already exists' }
      yield call(submitErrorHandler, { errors }, TAG_EDITOR_FORM_NAME)
    } else {
      yield call(submitErrorHandler, err, TAG_EDITOR_FORM_NAME)
    }
  }
}

function * deleteTag (action) {
  try {
    yield put.resolve({ type: tagConstants.DELETE_TAG_STARTING })
    const token = yield getAuthTokenForCurrentUser()
    const { id } = action.payload
    const url = `${process.env.WEBSITE_API_HOST_URL}/tag-service/tag/${id}`
    yield call(httpDelete, url, token)

    yield put.resolve({
      type: tagConstants.DELETE_TAG_SUCCEEDED,
      payload: { id }
    })

    yield put.resolve({ type: tagConstants.TAG_DELETED })
  } catch (err) {
    console.error('error in deleteTag: ' + err.message)
    yield put.resolve({ type: tagConstants.DELETE_TAG_FAILED })
  }
}

function getEventTagsPropertyName (tagType) {
  switch (tagType) {
    case tagConstants.TAG_TYPE_MEDIUM:
      return 'mediumTags'
    case tagConstants.TAG_TYPE_STYLE:
      return 'styleTags'
    case tagConstants.TAG_TYPE_AUDIENCE:
      return 'audienceTags'
    case tagConstants.TAG_TYPE_GEO:
      return 'geoTags'
    default:
      throw new Error(`tagType out of range: ${tagType}`)
  }
}

export default [
  takeLatest(tagConstants.GET_ALL_TAGS, getAllTags),
  takeLatest(tagConstants.GET_TAGS, getTags),
  takeLatest(tagConstants.ADD_TAG, addTag),
  takeLatest(tagConstants.DELETE_TAG, deleteTag)
]
