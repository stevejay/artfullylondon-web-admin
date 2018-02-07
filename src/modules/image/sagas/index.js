import { delay } from 'redux-saga'
import { call, takeLatest, race, put, select } from 'redux-saga/effects'
import {
  startSubmit,
  stopSubmit,
  reset,
  arrayPush,
  getFormValues,
  change
} from 'redux-form'
import log from 'loglevel'

import normalise from '_src/lib/normalise'
import { put as httpPut } from '_src/lib/fetch'
import { actions as notificationActions } from '_src/modules/notification'
import { getAuthTokenForCurrentUser } from '_src/modules/user'
import * as uuidLib from '_src/lib/uuid'
import * as sagaLib from '_src/lib/saga'
import * as validationLib from '_src/lib/validation'
import * as imageActions from '_src/modules/image/actions'
import * as imageConstants from '_src/modules/image/constants'

export function * getImages (parentFormName) {
  const formValues = yield select(getFormValues(parentFormName))
  return formValues.images
}

export function * updateImage ({ payload, meta }) {
  try {
    const { id, parentFormName } = payload
    yield put(startSubmit(imageConstants.UPDATE_IMAGE_FORM_NAME))

    const values = yield call(
      normalise,
      payload.values,
      imageConstants.UPDATE_IMAGE_NORMALISER
    )

    yield call(
      validationLib.validate,
      values,
      imageConstants.UPDATE_IMAGE_CONSTRAINT
    )

    const images = yield call(getImages, parentFormName)

    const imageIndex = images.findIndex(x => x.id === id)
    if (imageIndex === -1) {
      return
    }

    const newImages = images.slice()
    const newImage = Object.assign({}, images[imageIndex], { ...values })
    newImages[imageIndex] = newImage

    yield put(change(parentFormName, 'images', newImages))
    yield put(stopSubmit(imageConstants.UPDATE_IMAGE_FORM_NAME))
    yield put(sagaLib.returnAsPromise(null, meta))
  } catch (err) {
    yield call(log.error, err)

    yield call(
      sagaLib.submitErrorHandler,
      err,
      imageConstants.UPDATE_IMAGE_FORM_NAME
    )
  }
}

export function * deleteImage (action) {
  try {
    const { id, parentFormName } = action.payload
    const images = yield call(getImages, parentFormName)

    const imageIndex = images.findIndex(x => x.id === id)
    if (imageIndex === -1) {
      return
    }

    const deletedImageIsMain = images[imageIndex].isMain
    const newImages = images.filter(x => x.id !== id)

    if (deletedImageIsMain && newImages.length > 0) {
      const newImage = Object.assign({}, newImages[0], { isMain: true })
      newImages.splice(0, 1, newImage)
    }

    yield put(change(parentFormName, 'images', newImages))
  } catch (err) {
    yield call(log.error, err)
  }
}

export function * setMainImage (action) {
  try {
    const { id, parentFormName } = action.payload
    const images = yield call(getImages, parentFormName)

    const imageIndex = images.findIndex(x => x.id === id)
    if (imageIndex === -1) {
      return
    }

    const newImages = images.map(image => ({
      ...image,
      isMain: image.id === id
    }))

    yield put(change(parentFormName, 'images', newImages))
  } catch (err) {
    yield call(log.error, err)
  }
}

function * addImage (action) {
  const { entityType, isMain, parentFormName } = action.payload
  let values = action.payload.values
  const id = uuidLib.create()

  try {
    yield put(startSubmit(imageConstants.IMAGE_EDITOR_FORM_NAME))

    values = yield call(normalise, values, imageConstants.ADD_IMAGE_NORMALISER)

    yield call(
      validationLib.validate,
      values,
      imageConstants.ADD_IMAGE_CONSTRAINT
    )
  } catch (err) {
    yield call(
      sagaLib.submitErrorHandler,
      err,
      imageConstants.IMAGE_EDITOR_FORM_NAME
    )

    return
  }

  try {
    const putUrl = `${process.env.WEBSITE_API_HOST_URL}/image-service/image/${id}`
    const token = yield call(getAuthTokenForCurrentUser)

    const { json, timeout } = yield race({
      json: call(
        httpPut,
        putUrl,
        { url: values.imageUrl, type: entityType },
        token
      ),
      timeout: call(delay, 30000)
    })

    if (timeout) {
      throw new Error('The server took too long to process the image')
    }

    const newImage = {
      key: id,
      id: id,
      copyright: values.copyright,
      isMain,
      ratio: json.image.ratio,
      dominantColor: json.image.dominantColor
    }

    yield put(arrayPush(parentFormName, 'images', newImage))
    yield put(reset(imageConstants.IMAGE_EDITOR_FORM_NAME))
    yield put(stopSubmit(imageConstants.IMAGE_EDITOR_FORM_NAME))
  } catch (err) {
    yield call(log.error, err)

    yield put(
      notificationActions.addErrorNotification(
        'Failed to save the image',
        err.message
      )
    )

    yield call(
      sagaLib.submitErrorHandler,
      err,
      imageConstants.IMAGE_EDITOR_FORM_NAME
    )
  }
}

export default [
  takeLatest(imageActions.types.ADD_IMAGE, addImage),
  takeLatest(imageActions.types.SET_MAIN_IMAGE, setMainImage),
  takeLatest(imageActions.types.UPDATE_IMAGE, updateImage),
  takeLatest(imageActions.types.DELETE_IMAGE, deleteImage)
]
