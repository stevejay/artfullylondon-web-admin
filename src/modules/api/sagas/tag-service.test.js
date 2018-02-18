import { call } from 'redux-saga/effects'

import * as sagas from './tag-service'
import * as fetchLib from '_src/lib/fetch'
import { getAuthTokenForCurrentUser } from '_src/modules/user'

describe('getTags', () => {
  it('should get when tags exist', () => {
    const generator = sagas.getTags('medium')

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
    expect(result.value).toEqual([{ label: 'foo' }])

    expect(result.done).toEqual(true)
  })

  it('should get when tags do not exist', () => {
    const generator = sagas.getTags('medium')

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

    result = generator.next({ tags: { audience: [{ label: 'foo' }] } })
    expect(result.value).toEqual([])

    expect(result.done).toEqual(true)
  })
})

describe('addTag', () => {
  it('should add', () => {
    const generator = sagas.addTag({ tagType: 'medium', label: 'Label' })

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
