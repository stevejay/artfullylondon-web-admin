import { put, call, takeLatest } from 'redux-saga/effects'
import {
  startSubmit,
  stopSubmit,
  reset
  // getFormValues,
  // change
} from 'redux-form'
import log from 'loglevel'

import * as sagaLib from '_src/lib/saga'
import * as fetchLib from '_src/lib/fetch'
import * as validationLib from '_src/lib/validation'
import * as tagActionTypes from '_src/constants/action/tag'
import * as formConstants from '_src/constants/form'
import * as authLib from '_src/lib/auth'
import normalise from '_src/lib/normalise'
import tagConstraint from '_src/constants/tag-constraint'
import tagNormaliser from '_src/constants/tag-normaliser'

// function * getAllTags () {
//   try {
//     yield put({ type: tagActionTypes.GET_TAGS_STARTED })

//     const url = process.env.WEBSITE_API_HOST_URL + '/tag-service/tags'
//     const token = yield authLib.getAuthTokenForCurrentUser()
//     const json = yield call(fetchLib.get, url, token)

//     yield put({
//       type: tagActionTypes.GET_TAGS_SUCCEEDED,
//       payload: json
//     })
//   } catch (err) {
//     yield call(log.error, err)
//     yield put({ type: tagActionTypes.GET_TAGS_FAILED })
//   }
// }

export function * getTags (action) {
  try {
    const tagType = action.payload.tagType

    yield put({
      type: tagActionTypes.GET_TAGS_STARTED,
      payload: { tagType }
    })

    const url =
      process.env.WEBSITE_API_HOST_URL + '/tag-service/tags/' + tagType
    const token = yield call(authLib.getAuthTokenForCurrentUser)
    const json = yield call(fetchLib.get, url, token)

    yield put({
      type: tagActionTypes.GET_TAGS_SUCCEEDED,
      payload: { tags: json.tags[tagType] || [] }
    })
  } catch (err) {
    yield call(log.error, err)
    yield put({ type: tagActionTypes.GET_TAGS_FAILED })
  }
}

export function * addTag (action) {
  try {
    yield put(startSubmit(formConstants.TAG_EDITOR_FORM_NAME))
    yield put({ type: tagActionTypes.ADD_TAG_STARTED })

    const values = yield call(normalise, action.payload, tagNormaliser)
    yield call(validationLib.validate, values, tagConstraint)

    const { tagType, label } = values
    const url = `${process.env.WEBSITE_API_HOST_URL}/tag-service/tag/${tagType}`
    const token = yield call(authLib.getAuthTokenForCurrentUser)
    const json = yield call(fetchLib.post, url, { label }, token)

    yield put({
      type: tagActionTypes.ADD_TAG_SUCCEEDED,
      payload: { tag: json.tag }
    })

    // if (action.payload.addTagForEvent) {
    //   const propertyName = getEventTagsPropertyName(tagType)

    //   const formValues = yield select(
    //     getFormValues(formConstants.EDIT_EVENT_TAGS_FORM_NAME)
    //   )

    //   const tags = formValues[propertyName]

    //   if (tags.indexOf(x => x.id === json.tag.id) === -1) {
    //     const newTags = tags.slice()
    //     newTags.push(json.tag)

    //     yield put(
    //       change(formConstants.EDIT_EVENT_TAGS_FORM_NAME, propertyName, newTags)
    //     )
    //   }
    // }

    yield put(stopSubmit(formConstants.TAG_EDITOR_FORM_NAME))
    yield put(reset(formConstants.TAG_EDITOR_FORM_NAME))
  } catch (err) {
    yield call(log.error, err)
    yield put({ type: tagActionTypes.ADD_TAG_FAILED })

    const payload = err.message === '[400] Stale Data'
      ? { label: 'A tag with this label already exists' }
      : err

    yield call(
      sagaLib.submitErrorHandler,
      payload,
      formConstants.TAG_EDITOR_FORM_NAME
    )
  }
}

export function * deleteTag (action) {
  try {
    const { id } = action.payload

    yield put({ type: tagActionTypes.DELETE_TAG_STARTED })

    const url = `${process.env.WEBSITE_API_HOST_URL}/tag-service/tag/${id}`
    const token = yield call(authLib.getAuthTokenForCurrentUser)
    yield call(fetchLib.httpDelete, url, token)

    yield put({
      type: tagActionTypes.DELETE_TAG_SUCCEEDED,
      payload: { id }
    })

    // yield put({ type: tagActionTypes.TAG_DELETED })
  } catch (err) {
    yield call(log.error, err)
    yield put({ type: tagActionTypes.DELETE_TAG_FAILED })
  }
}

// function getEventTagsPropertyName (tagType) {
//   switch (tagType) {
//     case tagConstants.TAG_TYPE_MEDIUM:
//       return 'mediumTags'
//     case tagConstants.TAG_TYPE_STYLE:
//       return 'styleTags'
//     case tagConstants.TAG_TYPE_AUDIENCE:
//       return 'audienceTags'
//     case tagConstants.TAG_TYPE_GEO:
//       return 'geoTags'
//     default:
//       throw new Error(`tagType out of range: ${tagType}`)
//   }
// }

export default [
  // takeLatest(tagActionTypes.GET_ALL_TAGS, getAllTags),
  takeLatest(tagActionTypes.GET_TAGS, getTags),
  takeLatest(tagActionTypes.ADD_TAG, addTag),
  takeLatest(tagActionTypes.DELETE_TAG, deleteTag)
]
