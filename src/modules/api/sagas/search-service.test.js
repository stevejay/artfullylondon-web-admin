import { call } from 'redux-saga/effects'

import * as sagas from './search-service'
import * as fetchLib from '_src/shared/lib/fetch'

describe('getEntityCounts', () => {
  it('should get', () => {
    const generator = sagas.getEntityCounts()

    let result = generator.next()
    expect(result.value).toEqual(
      call(
        fetchLib.get,
        'https://api.test.com/search-service/admin/search/preset/entity-counts'
      )
    )

    result = generator.next([{ count: 6 }])
    expect(result.value).toEqual([{ count: 6 }])

    expect(result.done).toEqual(true)
  })
})

describe('autocompleteSearch', () => {
  it('should get', () => {
    const generator = sagas.autocompleteSearch({ term: 'foo', skip: 4 })

    let result = generator.next()
    expect(result.value).toEqual(
      call(
        fetchLib.get,
        'https://api.test.com/search-service/admin/search/auto?skip=4&term=foo'
      )
    )

    result = generator.next({ items: [{ id: 'some-id' }] })
    expect(result.value).toEqual([
      { id: 'some-id', autocompleteItemType: 'entity' }
    ])

    expect(result.done).toEqual(true)
  })
})

describe('basicSearch', () => {
  it('should get', () => {
    const generator = sagas.basicSearch({ term: 'foo', skip: 4 })

    let result = generator.next()
    expect(result.value).toEqual(
      call(
        fetchLib.get,
        'https://api.test.com/search-service/admin/search/basic?skip=4&term=foo'
      )
    )

    result = generator.next({ items: [{ id: 'some-id' }] })
    expect(result.value).toEqual({ items: [{ id: 'some-id' }] })

    expect(result.done).toEqual(true)
  })
})
