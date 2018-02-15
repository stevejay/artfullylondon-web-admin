import { cloneableGenerator } from 'redux-saga/utils'
import { delay } from 'redux-saga'
import { call, race, put } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset, arrayPush, change } from 'redux-form'
import log from 'loglevel'

import { put as httpPut } from '_src/lib/fetch'
import * as uuidLib from '_src/lib/uuid'
import * as sagas from './index'
import * as imageConstants from '_src/modules/image/constants'
import normalise from '_src/lib/normalise'
import { actions as notificationActions } from '_src/modules/notification'
import * as validationLib from '_src/lib/validation'
import * as sagaLib from '_src/lib/saga'
import { getAuthTokenForCurrentUser } from '_src/modules/user'

describe('getImages', () => {
  it('should get the images', () => {
    const generator = sagas.getImages('ParentFormName')

    let result = generator.next()

    result = generator.next({ images: [{ id: 1 }] })

    expect(result.value).toEqual([{ id: 1 }])

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})

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

    expect(result.value).toEqual(call(sagas.getImages, 'ParentFormName'))

    result = generatorClone.next([{ id: 'image-id' }, { id: 'other-image-id' }])

    expect(result.value).toEqual(
      put(
        change('ParentFormName', 'images', [
          { id: 'image-id', name: 'Normalised name' },
          { id: 'other-image-id' }
        ])
      )
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

    expect(result.value).toEqual(call(sagas.getImages, 'ParentFormName'))
  })

  it('should handle an image that is not found', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next([{ id: 'other-image-id' }])

    expect(result.done).toEqual(true)
  })

  it('should handle deleting a main image when there is another image', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next([
      { id: 'image-id', isMain: true },
      { id: 'other-image-id' }
    ])

    expect(result.value).toEqual(
      put(
        change('ParentFormName', 'images', [
          { id: 'other-image-id', isMain: true }
        ])
      )
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle deleting a non-main image', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next([
      { id: 'image-id' },
      { id: 'other-image-id', isMain: true }
    ])

    expect(result.value).toEqual(
      put(
        change('ParentFormName', 'images', [
          { id: 'other-image-id', isMain: true }
        ])
      )
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle deleting a main image when there is no other image', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next([{ id: 'image-id', isMain: true }])

    expect(result.value).toEqual(put(change('ParentFormName', 'images', [])))

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

    expect(result.value).toEqual(call(sagas.getImages, 'ParentFormName'))
  })

  it('should handle not finding the image', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next([{ id: 'other-image-id' }])

    expect(result.done).toEqual(true)
  })

  it('should handle setting the image as main', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next([
      { id: 'image-id' },
      { id: 'other-image-id', isMain: true }
    ])

    expect(result.value).toEqual(
      put(
        change('ParentFormName', 'images', [
          { id: 'image-id', isMain: true },
          { id: 'other-image-id', isMain: false }
        ])
      )
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
  })

  it('should handle normalisation and resizing succeeding', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next({
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

    result = generatorClone.next()

    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generatorClone.next('some-token')

    expect(result.value).toEqual(
      race({
        json: call(
          httpPut,
          'https://api.test.com/image-service/image/some-uuid',
          { url: '/some/normalised/url', type: 'talent' },
          'some-token'
        ),
        timeout: call(delay, 30000)
      })
    )

    result = generatorClone.next({
      json: { image: { ratio: 3, dominantColor: 'AAAAAA' } }
    })

    expect(result.value).toEqual(
      put(
        arrayPush('ParentFormName', 'images', {
          key: 'some-uuid',
          id: 'some-uuid',
          copyright: 'Some copyright',
          ratio: 3,
          dominantColor: 'AAAAAA'
        })
      )
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

  it('should handle normalisation succeeding but resizing failing', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next({
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

    result = generatorClone.next()

    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generatorClone.next('some-token')

    expect(result.value).toEqual(
      race({
        json: call(
          httpPut,
          'https://api.test.com/image-service/image/some-uuid',
          { url: '/some/normalised/url', type: 'talent' },
          'some-token'
        ),
        timeout: call(delay, 30000)
      })
    )

    result = generatorClone.next({ timeout: true })

    const error = new Error('The server took too long to process the image')

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

  it('should handle normalisation failing', () => {
    const generatorClone = generator.clone()

    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)

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
