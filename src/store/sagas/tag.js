import { put, call, takeLatest } from 'redux-saga/effects'
import {
  startSubmit,
  stopSubmit,
  reset
  // getFormValues,
  // change
} from 'redux-form'
import log from 'loglevel'

import normalise from '_src/lib/normalise'
import tagConstraint from '_src/constants/tag-constraint'
import tagNormaliser from '_src/constants/tag-normaliser'
import * as authLib from '_src/lib/auth'
import * as sagaLib from '_src/lib/saga'
import * as fetchLib from '_src/lib/fetch'
import * as validationLib from '_src/lib/validation'
import * as tagActions from '_src/store/actions/tag'
import * as formConstants from '_src/constants/form'
import * as authSagas from '_src/store/sagas/auth'

// function * getAllTags () {
//   try {
//     yield put({ type: tagActionTypes.GET_TAGS_STARTED })

//     const url = process.env.WEBSITE_API_HOST_URL + '/tag-service/tags'
//     const token = yield call(authSagas.getAuthTokenForCurrentUser)
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
    yield put(tagActions.getTagsStarted(tagType))

    const url =
      process.env.WEBSITE_API_HOST_URL + '/tag-service/tags/' + tagType
    const token = yield call(authSagas.getAuthTokenForCurrentUser)
    const json = yield call(fetchLib.get, url, token)

    yield put(tagActions.getTagsSucceeded(json.tags[tagType] || []))
  } catch (err) {
    yield call(log.error, err)
    yield put(tagActions.getTagsFailed())
  }
}

export function * addTag (action) {
  try {
    yield put(startSubmit(formConstants.TAG_EDITOR_FORM_NAME))
    yield put(tagActions.addTagStarted())

    const values = yield call(normalise, action.payload, tagNormaliser)
    yield call(validationLib.validate, values, tagConstraint)

    const { tagType, label } = values
    const url = `${process.env.WEBSITE_API_HOST_URL}/tag-service/tag/${tagType}`
    const token = yield call(authSagas.getAuthTokenForCurrentUser)
    const json = yield call(fetchLib.post, url, { label }, token)

    yield put(tagActions.addTagSucceeded(json.tag))

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
    yield put(tagActions.addTagFailed())

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

    yield put(tagActions.deleteTagStarted())

    const url = `${process.env.WEBSITE_API_HOST_URL}/tag-service/tag/${id}`
    const token = yield call(authSagas.getAuthTokenForCurrentUser)
    yield call(fetchLib.httpDelete, url, token)

    yield put(tagActions.deleteTagSucceeded(id))

    // yield put({ type: tagActionTypes.TAG_DELETED })
  } catch (err) {
    yield call(log.error, err)
    yield put(tagActions.deleteTagFailed())
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
  takeLatest(tagActions.types.GET_TAGS, getTags),
  takeLatest(tagActions.types.ADD_TAG, addTag),
  takeLatest(tagActions.types.DELETE_TAG, deleteTag)
]
