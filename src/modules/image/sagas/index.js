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

import normalise from '_src/shared/lib/normalise'
import { actions as notificationActions } from '_src/modules/notification'
import * as uuidLib from '_src/shared/lib/uuid'
import * as sagaLib from '_src/shared/lib/saga'
import * as validationLib from '_src/shared/lib/validation'
import * as imageActions from '../actions'
import * as imageConstants from '../constants'
import { imageService } from '_src/modules/api'

export function * updateImageFormValue (parentFormName, id, updateValues) {
  const formValues = yield select(getFormValues, parentFormName)
  const newImages = formValues.images.slice()
  const imageIndex = newImages.findIndex(x => x.id === id)

  if (imageIndex > -1) {
    const newImage = { ...newImages[imageIndex], ...updateValues }
    newImages[imageIndex] = newImage
  }

  return newImages
}

export function * deleteFromImageFormValue (parentFormName, imageIdToDelete) {
  const formValues = yield select(getFormValues, parentFormName)
  const images = formValues.images

  const imageIndex = images.findIndex(x => x.id === imageIdToDelete)
  if (imageIndex === -1) {
    return images
  }

  const newImages = images.filter(x => x.id !== imageIdToDelete)
  const deletedImageIsMain = images[imageIndex].isMain

  if (deletedImageIsMain && newImages.length > 0) {
    const newImage = { ...newImages[0], isMain: true }
    newImages.splice(0, 1, newImage)
  }

  return newImages
}

export function * setMainImageInImageFormValue (parentFormName, imageId) {
  const formValues = yield select(getFormValues, parentFormName)
  const images = formValues.images

  const imageIndex = images.findIndex(x => x.id === imageId)
  if (imageIndex === -1) {
    return images
  }

  return images.map(image => ({
    ...image,
    isMain: image.id === imageId
  }))
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

    const images = yield call(updateImageFormValue, parentFormName, id, values)
    yield put(change(parentFormName, 'images', images))
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
    const images = yield call(deleteFromImageFormValue, parentFormName, id)
    yield put(change(parentFormName, 'images', images))
  } catch (err) {
    yield call(log.error, err)
  }
}

export function * setMainImage (action) {
  try {
    const { id, parentFormName } = action.payload
    const images = yield call(setMainImageInImageFormValue, parentFormName, id)
    yield put(change(parentFormName, 'images', images))
  } catch (err) {
    yield call(log.error, err)
  }
}

export function * addImage (action) {
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

    const { image, timeout } = yield race({
      image: call(
        imageService.addImage,
        entityType,
        id,
        values.imageUrl,
        values.copyright,
        isMain
      ),
      timeout: call(delay, 30000)
    })

    if (timeout) {
      throw new Error('The server took too long to process the image')
    }

    yield put(arrayPush(parentFormName, 'images', image))
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
