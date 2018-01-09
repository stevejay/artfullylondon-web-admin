import { call, takeLatest, put, select } from 'redux-saga/effects'
import {
  getFormValues,
  change,
  startSubmit,
  stopSubmit,
  reset
} from 'redux-form'
import { submitErrorHandler } from '_src/lib/saga'
import { validate, validateLink } from '_src/lib/validation'
import normalise from '_src/lib/normalise'
import * as types from '_src/constants/link'
import linkConstraint from '_src/constants/link-constraint'
import linkNormaliser from '_src/constants/link-normaliser'
import { LINK_EDITOR_FORM_NAME } from '_src/constants/form'

function * getLinks (parentFormName) {
  const formValues = yield select(getFormValues(parentFormName))
  return formValues.links
}

function * addLink (action) {
  try {
    yield put.resolve(startSubmit(LINK_EDITOR_FORM_NAME))
    const { parentFormName } = action.payload

    const values = yield call(normalise, action.payload.values, linkNormaliser)
    yield call(validate, values, linkConstraint, validateLink)

    const links = yield call(getLinks, parentFormName)
    const newLinks = links.slice()

    const newLink = {
      key: values.linkType,
      type: values.linkType,
      url: values.linkUrl
    }

    newLinks.push(newLink)

    yield put.resolve(change(parentFormName, 'links', newLinks))
    yield put.resolve(reset(LINK_EDITOR_FORM_NAME))
    yield put.resolve(stopSubmit(LINK_EDITOR_FORM_NAME))
  } catch (err) {
    console.error('addLink error', err)
    yield call(submitErrorHandler, err, LINK_EDITOR_FORM_NAME)
  }
}

function * deleteLink (action) {
  try {
    const { key, parentFormName } = action.payload
    const links = yield call(getLinks, parentFormName)
    const newLinks = links.filter(x => x.key !== key)
    yield put.resolve(change(parentFormName, 'links', newLinks))
  } catch (err) {
    console.error('deleteLink error', err)
  }
}

export default [
  takeLatest(types.ADD_LINK, addLink),
  takeLatest(types.DELETE_LINK, deleteLink)
]
