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
import { put as httpPut } from '_src/lib/fetch'
import { submitErrorHandler } from '_src/lib/saga'
import { validate } from '_src/lib/validation'
import normalise from '_src/lib/normalise'
import * as types from '_src/constants/image'
import * as notificationsTypes from '_src/constants/notifications'
import * as modalTypes from '_src/constants/modal'
import { getAuthTokenForCurrentUser } from '_src/lib/auth'
import uuid from '_src/lib/uuid'
import {
  addImageConstraint,
  updateImageConstraint
} from '_src/constants/image-constraints'
import {
  addImageNormaliser,
  updateImageNormaliser
} from '_src/constants/image-normalisers'
import {
  IMAGE_EDITOR_FORM_NAME,
  UPDATE_IMAGE_FORM_NAME
} from '_src/constants/form'

function * getImages (parentFormName) {
  const formValues = yield select(getFormValues(parentFormName))
  return formValues.images
}

function * updateImage (action) {
  try {
    const { id, parentFormName } = action.payload

    yield put.resolve(startSubmit(UPDATE_IMAGE_FORM_NAME))
    const values = yield call(
      normalise,
      action.payload.values,
      updateImageNormaliser
    )
    yield call(validate, values, updateImageConstraint)

    const images = yield call(getImages, parentFormName)

    const imageIndex = images.findIndex(x => x.id === id)
    if (imageIndex === -1) {
      return
    }

    const newImages = images.slice()
    const newImage = Object.assign({}, images[imageIndex], { ...values })
    newImages[imageIndex] = newImage

    yield put.resolve(change(parentFormName, 'images', newImages))
    yield put.resolve(stopSubmit(UPDATE_IMAGE_FORM_NAME))
    yield put.resolve({ type: modalTypes.HIDE_MODAL })
  } catch (err) {
    console.error('updateImage error', err)
    yield call(submitErrorHandler, err, UPDATE_IMAGE_FORM_NAME)
  }
}

function * deleteImage (action) {
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

    yield put.resolve(change(parentFormName, 'images', newImages))
  } catch (err) {
    console.error('deleteImage error', err)
  }
}

function * setMainImage (action) {
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

    yield put.resolve(change(parentFormName, 'images', newImages))
  } catch (err) {
    console.error('setMainImage error', err)
  }
}

function * addImage (action) {
  const { entityType, isMain, parentFormName } = action.payload
  let values = action.payload.values
  const id = uuid()

  try {
    yield put.resolve(startSubmit(IMAGE_EDITOR_FORM_NAME))
    values = yield call(normalise, values, addImageNormaliser)
    yield call(validate, values, addImageConstraint)
  } catch (err) {
    yield call(submitErrorHandler, err, IMAGE_EDITOR_FORM_NAME)
    return
  }

  try {
    const putUrl = `${process.env.WEBSITE_API_HOST_URL}/image-service/image/${id}`
    const token = yield getAuthTokenForCurrentUser()

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

    yield put.resolve(arrayPush(parentFormName, 'images', newImage))
    yield put.resolve(reset(IMAGE_EDITOR_FORM_NAME))
    yield put.resolve(stopSubmit(IMAGE_EDITOR_FORM_NAME))
  } catch (err) {
    console.error('addImage error', err)

    yield put({
      type: notificationsTypes.ADD_NOTIFICATION,
      payload: {
        type: 'Error',
        title: 'Failed to save the image',
        message: err.message
      }
    })

    yield call(submitErrorHandler, err, IMAGE_EDITOR_FORM_NAME)
  }
}

export default [
  takeLatest(types.ADD_IMAGE, addImage),
  takeLatest(types.SET_MAIN_IMAGE, setMainImage),
  takeLatest(types.UPDATE_IMAGE, updateImage),
  takeLatest(types.DELETE_IMAGE, deleteImage)
]