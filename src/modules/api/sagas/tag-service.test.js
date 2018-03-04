import { call } from 'redux-saga/effects'

import * as sagas from './tag-service'
import * as fetchLib from '_src/shared/lib/fetch'
import { getAuthTokenForCurrentUser } from '_src/modules/user'

describe('getTags', () => {
  it('should get when tags exist', () => {
    const generator = sagas.getTags(tagType.MEDIUM)

    let result = generator.next()
    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')
    expect(result.value).toEqual(
      call(
        fetchLib.get,
        'https://api.test.com/tag-service/tags/medium',
        'some-token'
      )
    )

    result = generator.next({ tags: { medium: [{ label: 'foo' }] } })
    expect(result.value).toEqual({ medium: [{ label: 'foo' }] })

    expect(result.done).toEqual(true)
  })
})

describe('getAllTags', () => {
  it('should get all tags', () => {
    const generator = sagas.getAllTags(tagType.MEDIUM)

    let result = generator.next()
    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')
    expect(result.value).toEqual(
      call(fetchLib.get, 'https://api.test.com/tag-service/tags', 'some-token')
    )

    result = generator.next({ tags: { medium: [{ label: 'foo' }] } })
    expect(result.value).toEqual({ medium: [{ label: 'foo' }] })

    expect(result.done).toEqual(true)
  })
})

describe('addTag', () => {
  it('should add', () => {
    const generator = sagas.addTag({ tagType: tagType.MEDIUM, label: 'Label' })

    let result = generator.next()
    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')
    expect(result.value).toEqual(
      call(
        fetchLib.post,
        'https://api.test.com/tag-service/tag/medium',
        { label: 'Label' },
        'some-token'
      )
    )

    result = generator.next({ tag: { label: 'from server' } })
    expect(result.value).toEqual({ label: 'from server' })

    expect(result.done).toEqual(true)
  })
})

describe('deleteTag', () => {
  it('should add', () => {
    const generator = sagas.deleteTag('medium/sculpture')

    let result = generator.next()
    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')
    expect(result.value).toEqual(
      call(
        fetchLib.httpDelete,
        'https://api.test.com/tag-service/tag/medium/sculpture',
        'some-token'
      )
    )

    result = generator.next()
    expect(result.done).toEqual(true)
  })
})
