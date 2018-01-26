import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import log from 'loglevel'
import { startSubmit, stopSubmit, reset } from 'redux-form'

import * as sagaLib from '_src/lib/saga'
import * as fetchLib from '_src/lib/fetch'
import * as tagActionTypes from '_src/constants/action/tag'
import * as tagSagas from '_src/store/sagas/tag'
import * as authLib from '_src/lib/auth'
import * as formConstants from '_src/constants/form'
import * as validationLib from '_src/lib/validation'
import normalise from '_src/lib/normalise'
import tagConstraint from '_src/constants/tag-constraint'
import tagNormaliser from '_src/constants/tag-normaliser'

describe('getTags', () => {
  const generator = cloneableGenerator(tagSagas.getTags)({
    payload: { tagType: 'medium' }
  })

  it('should prepare to get the tags for a tag type', () => {
    let result = generator.next()

    expect(result.value).toEqual(
      put({
        type: tagActionTypes.GET_TAGS_STARTED,
        payload: { tagType: 'medium' }
      })
    )

    result = generator.next()

    expect(result.value).toEqual(call(authLib.getAuthTokenForCurrentUser))

    result = generator.next({ the: 'token' })

    expect(result.value).toEqual(
      call(fetchLib.get, 'https://api.test.com/tag-service/tags/medium', {
        the: 'token'
      })
    )
  })

  it('should handle a response with tags', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next({ tags: { medium: [{ id: 1 }] } })

    expect(result.value).toEqual(
      put({
        type: tagActionTypes.GET_TAGS_SUCCEEDED,
        payload: { tags: [{ id: 1 }] }
      })
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle a response with no tags', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next({ tags: { audience: [{ id: 1 }] } })

    expect(result.value).toEqual(
      put({
        type: tagActionTypes.GET_TAGS_SUCCEEDED,
        payload: { tags: [] }
      })
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an error response', () => {
    const generatorClone = generator.clone()
    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()

    expect(result.value).toEqual(put({ type: tagActionTypes.GET_TAGS_FAILED }))

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})

describe('addTag', () => {
  const generator = cloneableGenerator(tagSagas.addTag)({
    payload: { label: 'Sculpture', tagType: 'medium' }
  })

  it('should prepare to add the tag', () => {
    let result = generator.next()

    expect(result.value).toEqual(
      put(startSubmit(formConstants.TAG_EDITOR_FORM_NAME))
    )

    result = generator.next()

    expect(result.value).toEqual(put({ type: tagActionTypes.ADD_TAG_STARTED }))

    result = generator.next()

    expect(result.value).toEqual(
      call(normalise, { label: 'Sculpture', tagType: 'medium' }, tagNormaliser)
    )

    result = generator.next({ label: 'sculpture', tagType: 'medium' })

    expect(result.value).toEqual(
      call(
        validationLib.validate,
        { label: 'sculpture', tagType: 'medium' },
        tagConstraint
      )
    )

    result = generator.next()

    expect(result.value).toEqual(call(authLib.getAuthTokenForCurrentUser))

    result = generator.next({ the: 'token' })

    expect(result.value).toEqual(
      call(
        fetchLib.post,
        'https://api.test.com/tag-service/tag/medium',
        { label: 'sculpture' },
        { the: 'token' }
      )
    )
  })

  it('should handle successfully adding the tag', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next({
      tag: { id: 'medium/sculpture', label: 'sculpture' }
    })

    expect(result.value).toEqual(
      put({
        type: tagActionTypes.ADD_TAG_SUCCEEDED,
        payload: { tag: { id: 'medium/sculpture', label: 'sculpture' } }
      })
    )

    result = generatorClone.next()

    expect(result.value).toEqual(
      put(stopSubmit(formConstants.TAG_EDITOR_FORM_NAME))
    )

    result = generatorClone.next()

    expect(result.value).toEqual(put(reset(formConstants.TAG_EDITOR_FORM_NAME)))

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle failing to add the tag', () => {
    const generatorClone = generator.clone()
    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()

    expect(result.value).toEqual(put({ type: tagActionTypes.ADD_TAG_FAILED }))

    result = generatorClone.next()

    expect(result.value).toEqual(
      call(
        sagaLib.submitErrorHandler,
        error,
        formConstants.TAG_EDITOR_FORM_NAME
      )
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})

describe('deleteTag', () => {
  const generator = cloneableGenerator(tagSagas.deleteTag)({
    payload: { id: 'medium/sculpture' }
  })

  it('should prepare to delete the tag', () => {
    let result = generator.next()

    expect(result.value).toEqual(
      put({ type: tagActionTypes.DELETE_TAG_STARTED })
    )

    result = generator.next()

    expect(result.value).toEqual(call(authLib.getAuthTokenForCurrentUser))

    result = generator.next({ the: 'token' })

    expect(result.value).toEqual(
      call(
        fetchLib.httpDelete,
        'https://api.test.com/tag-service/tag/medium/sculpture',
        { the: 'token' }
      )
    )
  })

  it('should handle a successful deletion of the tag', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()

    expect(result.value).toEqual(
      put({
        type: tagActionTypes.DELETE_TAG_SUCCEEDED,
        payload: { id: 'medium/sculpture' }
      })
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle a failed deletion of the tag', () => {
    const generatorClone = generator.clone()
    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()

    expect(result.value).toEqual(
      put({
        type: tagActionTypes.DELETE_TAG_FAILED
      })
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})
