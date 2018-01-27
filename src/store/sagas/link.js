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
import linkConstraint from '_src/constants/link-constraint'
import linkNormaliser from '_src/constants/link-normaliser'
import * as sagaLib from '_src/lib/saga'
import * as validationLib from '_src/lib/validation'
import * as linkActionTypes from '_src/constants/action/link'
import * as formConstants from '_src/constants/form'

function * getLinks (parentFormName) {
  const formValues = yield select(getFormValues(parentFormName))
  return formValues.links
}

function * addLink (action) {
  try {
    yield put(startSubmit(formConstants.LINK_EDITOR_FORM_NAME))

    const { parentFormName } = action.payload
    const values = yield call(normalise, action.payload.values, linkNormaliser)

    yield call(
      validationLib.validate,
      values,
      linkConstraint,
      validationLib.validateLink
    )

    const links = yield call(getLinks, parentFormName)
    const newLinks = links.slice()

    const newLink = {
      key: values.linkType,
      type: values.linkType,
      url: values.linkUrl
    }

    newLinks.push(newLink)

    yield put(change(parentFormName, 'links', newLinks))
    yield put(reset(formConstants.LINK_EDITOR_FORM_NAME))
    yield put(stopSubmit(formConstants.LINK_EDITOR_FORM_NAME))
  } catch (err) {
    yield call(log.error, err)

    yield call(
      sagaLib.submitErrorHandler,
      err,
      formConstants.LINK_EDITOR_FORM_NAME
    )
  }
}

function * deleteLink (action) {
  try {
    const { key, parentFormName } = action.payload
    const links = yield call(getLinks, parentFormName)
    const newLinks = links.filter(x => x.key !== key)
    yield put(change(parentFormName, 'links', newLinks))
  } catch (err) {
    yield call(log.error, err)
  }
}

export default [
  takeLatest(linkActionTypes.ADD_LINK, addLink),
  takeLatest(linkActionTypes.DELETE_LINK, deleteLink)
]
