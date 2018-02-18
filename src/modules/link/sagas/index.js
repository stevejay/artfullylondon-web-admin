import { call, takeLatest, put, select } from 'redux-saga/effects'
import {
  getFormValues,
  change,
  startSubmit,
  stopSubmit,
  reset
} from 'redux-form'
import log from 'loglevel'

import normalise from '_src/lib/normalise'
import * as sagaLib from '_src/lib/saga'
import * as validationLib from '_src/lib/validation'
import * as linkLib from '../lib/link'
import * as linkActions from '../actions'
import * as linkConstants from '../constants'

export function * addLinkToLinksFormValue (parentFormName, values) {
  const formValues = yield select(getFormValues, parentFormName)
  const newLinks = formValues.links.slice()

  const newLink = {
    key: values.linkType,
    type: values.linkType,
    url: values.linkUrl
  }

  newLinks.push(newLink)
  return newLinks
}

export function * deleteLinkFromLinksFormValue (parentFormName, key) {
  const formValues = yield select(getFormValues, parentFormName)
  const newLinks = formValues.links.filter(x => x.key !== key)
  return newLinks
}

export function * addLink (action) {
  try {
    const { parentFormName } = action.payload
    yield put(startSubmit(linkConstants.LINK_EDITOR_FORM_NAME))

    const values = yield call(
      normalise,
      action.payload.values,
      linkConstants.LINK_NORMALISER
    )

    yield call(
      validationLib.validate,
      values,
      linkConstants.LINK_CONSTRAINT,
      linkLib.validateLink
    )

    const links = yield call(addLinkToLinksFormValue, parentFormName, values)
    yield put(change(parentFormName, 'links', links))
    yield put(reset(linkConstants.LINK_EDITOR_FORM_NAME))
    yield put(stopSubmit(linkConstants.LINK_EDITOR_FORM_NAME))
  } catch (err) {
    yield call(log.error, err)

    yield call(
      sagaLib.submitErrorHandler,
      err,
      linkConstants.LINK_EDITOR_FORM_NAME
    )
  }
}

export function * deleteLink (action) {
  try {
    const { key, parentFormName } = action.payload
    const links = yield call(deleteLinkFromLinksFormValue, parentFormName, key)
    yield put(change(parentFormName, 'links', links))
  } catch (err) {
    yield call(log.error, err)
  }
}

export default [
  takeLatest(linkActions.types.ADD_LINK, addLink),
  takeLatest(linkActions.types.DELETE_LINK, deleteLink)
]
