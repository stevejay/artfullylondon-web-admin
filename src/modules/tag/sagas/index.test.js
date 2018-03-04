import { call, put } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import log from 'loglevel'
import { startSubmit, stopSubmit, reset } from 'redux-form'

import normalise from '_src/shared/lib/normalise'
import * as sagaLib from '_src/shared/lib/saga'
import * as tagSagas from './index'
import * as validationLib from '_src/shared/lib/validation'
import * as tagConstants from '../constants'
import * as tagActions from '../actions'
import { tagService } from '_src/modules/api'

describe('getTags', () => {
  describe('get a single tag type', () => {
    const generator = cloneableGenerator(tagSagas.getTags)(
      tagActions.getTags(tagType.MEDIUM)
    )

    it('should prepare to get the tags', () => {
      let result = generator.next()
      expect(result.value).toEqual(put(tagActions.getTagsStarted()))

      result = generator.next()
      expect(result.value).toEqual(call(tagService.getTags, tagType.MEDIUM))
    })

    it('should successfully get the tags', () => {
      const generatorClone = generator.clone()

      let result = generatorClone.next({ medium: [{ id: 1 }] })
      expect(result.value).toEqual(
        put(tagActions.getTagsSucceeded({ medium: [{ id: 1 }] }))
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
      expect(result.value).toEqual(put(tagActions.getTagsFailed()))

      result = generatorClone.next()
      expect(result.done).toEqual(true)
    })
  })

  describe('get all tag types', () => {
    it('should get the tags', () => {
      const generator = tagSagas.getTags(tagActions.getTags())

      let result = generator.next()
      expect(result.value).toEqual(put(tagActions.getTagsStarted()))

      result = generator.next()
      expect(result.value).toEqual(call(tagService.getAllTags, null))

      result = generator.next({ medium: [{ id: 1 }] })
      expect(result.value).toEqual(
        put(tagActions.getTagsSucceeded({ medium: [{ id: 1 }] }))
      )

      result = generator.next()
      expect(result.done).toEqual(true)
    })
  })
})

describe('addTag', () => {
  const generator = cloneableGenerator(tagSagas.addTag)(
    tagActions.addTag({ label: 'Sculpture', tagType: tagType.MEDIUM })
  )

  it('should prepare to add the tag', () => {
    let result = generator.next()
    expect(result.value).toEqual(
      put(startSubmit(tagConstants.TAG_EDITOR_FORM_NAME))
    )

    result = generator.next()
    expect(result.value).toEqual(put(tagActions.addTagStarted()))

    result = generator.next()
    expect(result.value).toEqual(
      call(
        normalise,
        { label: 'Sculpture', tagType: tagType.MEDIUM },
        tagConstants.NORMALISER
      )
    )

    result = generator.next({ label: 'sculpture', tagType: tagType.MEDIUM })
    expect(result.value).toEqual(
      call(
        validationLib.validate,
        { label: 'sculpture', tagType: tagType.MEDIUM },
        tagConstants.CONSTRAINT
      )
    )

    result = generator.next()
    expect(result.value).toEqual(
      call(tagService.addTag, { label: 'sculpture', tagType: tagType.MEDIUM })
    )
  })

  it('should handle successfully adding the tag', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next({
      id: 'medium/sculpture',
      label: 'sculpture'
    })
    expect(result.value).toEqual(
      put(
        tagActions.addTagSucceeded(
          {
            id: 'medium/sculpture',
            label: 'sculpture'
          },
          tagType.MEDIUM
        )
      )
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(stopSubmit(tagConstants.TAG_EDITOR_FORM_NAME))
    )

    result = generatorClone.next()
    expect(result.value).toEqual(put(reset(tagConstants.TAG_EDITOR_FORM_NAME)))

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(
        sagaLib.returnAsPromise(
          {
            id: 'medium/sculpture',
            label: 'sculpture'
          },
          { thunk: true }
        )
      )
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })

  it('should handle failing to add the tag', () => {
    const generatorClone = generator.clone()
    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)
    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()
    expect(result.value).toEqual(put(tagActions.addTagFailed()))

    result = generatorClone.next()
    expect(result.value).toEqual(
      call(sagaLib.submitErrorHandler, error, tagConstants.TAG_EDITOR_FORM_NAME)
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })

  it('should handle failing to add the tag because of stale data', () => {
    const generatorClone = generator.clone()
    const error = new Error('[400] Stale Data')

    let result = generatorClone.throw(error)
    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()
    expect(result.value).toEqual(put(tagActions.addTagFailed()))

    result = generatorClone.next()
    expect(result.value).toEqual(
      call(
        sagaLib.submitErrorHandler,
        { label: 'A tag with this label already exists' },
        tagConstants.TAG_EDITOR_FORM_NAME
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
    expect(result.value).toEqual(put(tagActions.deleteTagStarted()))

    result = generator.next()
    expect(result.value).toEqual(call(tagService.deleteTag, 'medium/sculpture'))
  })

  it('should handle a successful deletion of the tag', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()
    expect(result.value).toEqual(
      put(tagActions.deleteTagSucceeded('medium/sculpture'))
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
    expect(result.value).toEqual(put(tagActions.deleteTagFailed()))

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })
})
