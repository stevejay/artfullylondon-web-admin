import { cloneableGenerator } from 'redux-saga/utils'
import { delay } from 'redux-saga'
import { call, race, put, select } from 'redux-saga/effects'
import {
  startSubmit,
  stopSubmit,
  reset,
  arrayPush,
  change,
  getFormValues
} from 'redux-form'
import log from 'loglevel'

import * as uuidLib from '_src/lib/uuid'
import * as sagas from './index'
import * as imageConstants from '../constants'
import normalise from '_src/lib/normalise'
import { actions as notificationActions } from '_src/modules/notification'
import * as validationLib from '_src/lib/validation'
import * as sagaLib from '_src/lib/saga'
import { imageService } from '_src/modules/api'

describe('updateImage', () => {
  const generator = cloneableGenerator(sagas.updateImage)({
    payload: {
      id: 'image-id',
      parentFormName: 'ParentFormName',
      values: { name: 'Name' }
    },
    meta: { id: 12345 }
  })

  it('should prepare to update the image', () => {
    let result = generator.next()
    expect(result.value).toEqual(
      put(startSubmit(imageConstants.UPDATE_IMAGE_FORM_NAME))
    )

    result = generator.next()
    expect(result.value).toEqual(
      call(normalise, { name: 'Name' }, imageConstants.UPDATE_IMAGE_NORMALISER)
    )

    result = generator.next({ name: 'Normalised name' })
    expect(result.value).toEqual(
      call(
        validationLib.validate,
        { name: 'Normalised name' },
        imageConstants.UPDATE_IMAGE_CONSTRAINT
      )
    )
  })

  it('should successfully update the image', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()
    expect(result.value).toEqual(
      call(sagas.updateImageFormValue, 'ParentFormName', 'image-id', {
        name: 'Normalised name'
      })
    )

    const images = [
      { id: 'image-id', name: 'Normalised name' },
      { id: 'other-image-id' }
    ]

    result = generatorClone.next(images)
    expect(result.value).toEqual(
      put(change('ParentFormName', 'images', images))
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(stopSubmit(imageConstants.UPDATE_IMAGE_FORM_NAME))
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(sagaLib.returnAsPromise(null, { id: 12345 }))
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })

  it('should handle an error when updating the image', () => {
    const generatorClone = generator.clone()
    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)
    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()
    expect(result.value).toEqual(
      call(
        sagaLib.submitErrorHandler,
        error,
        imageConstants.UPDATE_IMAGE_FORM_NAME
      )
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })
})

describe('deleteImage', () => {
  const generator = cloneableGenerator(sagas.deleteImage)({
    payload: {
      id: 'image-id',
      parentFormName: 'ParentFormName'
    }
  })

  it('should prepare to delete the image', () => {
    let result = generator.next()
    expect(result.value).toEqual(
      call(sagas.deleteFromImageFormValue, 'ParentFormName', 'image-id')
    )
  })

  it('should successfully delete the image', () => {
    const generatorClone = generator.clone()
    const images = [{ id: 'other-image-id' }]

    let result = generatorClone.next(images)
    expect(result.value).toEqual(
      put(change('ParentFormName', 'images', images))
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })

  it('should handle an error being thrown', () => {
    const generatorClone = generator.clone()
    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)
    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })
})

describe('setMainImage', () => {
  const generator = cloneableGenerator(sagas.setMainImage)({
    payload: {
      id: 'image-id',
      parentFormName: 'ParentFormName'
    }
  })

  it('should prepare to set the image as main', () => {
    let result = generator.next()
    expect(result.value).toEqual(
      call(sagas.setMainImageInImageFormValue, 'ParentFormName', 'image-id')
    )
  })

  it('should successfully set the image as main', () => {
    const generatorClone = generator.clone()
    const images = [{ id: 'image-id' }, { id: 'other-image-id', isMain: true }]

    let result = generatorClone.next(images)
    expect(result.value).toEqual(
      put(change('ParentFormName', 'images', images))
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })

  it('should handle an error being thrown', () => {
    const generatorClone = generator.clone()
    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)
    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })
})

describe('addImage', () => {
  const generator = cloneableGenerator(sagas.addImage)({
    payload: {
      parentFormName: 'ParentFormName',
      entityType: 'talent',
      isMain: true,
      values: { imageUrl: '/some/url' }
    }
  })

  it('should prepare to add an image', () => {
    uuidLib.create = jest.fn().mockReturnValue('some-uuid')

    let result = generator.next()
    expect(result.value).toEqual(
      put(startSubmit(imageConstants.IMAGE_EDITOR_FORM_NAME))
    )

    result = generator.next()
    expect(result.value).toEqual(
      call(
        normalise,
        { imageUrl: '/some/url' },
        imageConstants.ADD_IMAGE_NORMALISER
      )
    )

    result = generator.next({
      imageUrl: '/some/normalised/url',
      copyright: 'Some copyright'
    })
    expect(result.value).toEqual(
      call(
        validationLib.validate,
        { imageUrl: '/some/normalised/url', copyright: 'Some copyright' },
        imageConstants.ADD_IMAGE_CONSTRAINT
      )
    )

    result = generator.next()
    expect(result.value).toEqual(
      race({
        image: call(
          imageService.addImage,
          'talent',
          'some-uuid',
          '/some/normalised/url',
          'Some copyright',
          true
        ),
        timeout: call(delay, 30000)
      })
    )
  })

  it('should handle resizing succeeding', () => {
    const generatorClone = generator.clone()

    const image = {
      key: 'some-uuid',
      id: 'some-uuid',
      copyright: 'Some copyright',
      isMain: true,
      ratio: 3,
      dominantColor: 'AAAAAA'
    }

    let result = generatorClone.next({ image })
    expect(result.value).toEqual(
      put(arrayPush('ParentFormName', 'images', image))
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(reset(imageConstants.IMAGE_EDITOR_FORM_NAME))
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(stopSubmit(imageConstants.IMAGE_EDITOR_FORM_NAME))
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })

  it('should handle resizing failing', () => {
    const generatorClone = generator.clone()
    const error = new Error('The server took too long to process the image')

    let result = generatorClone.next({ timeout: true })
    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(
        notificationActions.addErrorNotification(
          'Failed to save the image',
          error.message
        )
      )
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      call(
        sagaLib.submitErrorHandler,
        error,
        imageConstants.IMAGE_EDITOR_FORM_NAME
      )
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })
})

describe('updateImageFormValue', () => {
  it('should handle the image not being found', () => {
    const generator = sagas.updateImageFormValue('ParentFormName', 'image-id', {
      copyright: 'Updated copyright'
    })

    let result = generator.next()
    expect(result.value).toEqual(select(getFormValues, 'ParentFormName'))

    result = generator.next({ images: [{ id: 'other-image-id' }] })
    expect(result.value).toEqual([{ id: 'other-image-id' }])

    expect(result.done).toEqual(true)
  })

  it('should handle updating an image', () => {
    const generator = sagas.updateImageFormValue('ParentFormName', 'image-id', {
      copyright: 'Updated copyright'
    })

    let result = generator.next()
    expect(result.value).toEqual(select(getFormValues, 'ParentFormName'))

    result = generator.next({
      images: [{ id: 'image-id' }, { id: 'other-image-id' }]
    })
    expect(result.value).toEqual([
      { id: 'image-id', copyright: 'Updated copyright' },
      { id: 'other-image-id' }
    ])

    expect(result.done).toEqual(true)
  })
})

describe('deleteFromImageFormValue', () => {
  it('should handle the image not being found', () => {
    const generator = sagas.deleteFromImageFormValue(
      'ParentFormName',
      'image-id'
    )

    let result = generator.next()
    expect(result.value).toEqual(select(getFormValues, 'ParentFormName'))

    result = generator.next({ images: [{ id: 'other-image-id' }] })
    expect(result.value).toEqual([{ id: 'other-image-id' }])

    expect(result.done).toEqual(true)
  })

  it('should handle deleting a main image', () => {
    const generator = sagas.deleteFromImageFormValue(
      'ParentFormName',
      'image-id'
    )

    let result = generator.next()
    expect(result.value).toEqual(select(getFormValues, 'ParentFormName'))

    result = generator.next({
      images: [{ id: 'image-id', isMain: true }, { id: 'other-image-id' }]
    })
    expect(result.value).toEqual([{ id: 'other-image-id', isMain: true }])

    expect(result.done).toEqual(true)
  })

  it('should handle deleting a non-main image', () => {
    const generator = sagas.deleteFromImageFormValue(
      'ParentFormName',
      'image-id'
    )

    let result = generator.next()
    expect(result.value).toEqual(select(getFormValues, 'ParentFormName'))

    result = generator.next({
      images: [{ id: 'image-id' }, { id: 'other-image-id' }]
    })
    expect(result.value).toEqual([{ id: 'other-image-id' }])

    expect(result.done).toEqual(true)
  })
})

describe('setMainImageInImageFormValue', () => {
  it('should handle the image not being found', () => {
    const generator = sagas.setMainImageInImageFormValue(
      'ParentFormName',
      'image-id'
    )

    let result = generator.next()
    expect(result.value).toEqual(select(getFormValues, 'ParentFormName'))

    result = generator.next({ images: [{ id: 'other-image-id' }] })
    expect(result.value).toEqual([{ id: 'other-image-id' }])

    expect(result.done).toEqual(true)
  })

  it('should handle setting the main image when there is non already', () => {
    const generator = sagas.setMainImageInImageFormValue(
      'ParentFormName',
      'image-id'
    )

    let result = generator.next()
    expect(result.value).toEqual(select(getFormValues, 'ParentFormName'))

    result = generator.next({
      images: [{ id: 'image-id' }, { id: 'other-image-id' }]
    })
    expect(result.value).toEqual([
      { id: 'image-id', isMain: true },
      { id: 'other-image-id', isMain: false }
    ])

    expect(result.done).toEqual(true)
  })

  it('should handle setting the main image when there is one already', () => {
    const generator = sagas.setMainImageInImageFormValue(
      'ParentFormName',
      'image-id'
    )

    let result = generator.next()
    expect(result.value).toEqual(select(getFormValues, 'ParentFormName'))

    result = generator.next({
      images: [{ id: 'image-id' }, { id: 'other-image-id', isMain: true }]
    })
    expect(result.value).toEqual([
      { id: 'image-id', isMain: true },
      { id: 'other-image-id', isMain: false }
    ])

    expect(result.done).toEqual(true)
  })
})
