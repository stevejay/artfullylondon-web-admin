import { call } from 'redux-saga/effects'

import * as sagas from './event-service'
import * as fetchLib from '_src/lib/fetch'
import { getAuthTokenForCurrentUser } from '_src/modules/user'

describe('getEntity', () => {
  it('should get an entity', () => {
    const generator = sagas.getEntity('talent', 'talent-id')

    let result = generator.next()
    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')
    expect(result.value).toEqual(
      call(
        fetchLib.get,
        'https://api.test.com/event-service/admin/edit/talent/talent-id',
        'some-token'
      )
    )

    result = generator.next({ entity: { id: 'server-id' } })
    expect(result.value).toEqual({ id: 'server-id' })

    expect(result.done).toEqual(true)
  })
})

describe('saveEntity', () => {
  const mapper = jest.fn(value => value)

  it('should save a new entity', () => {
    const generator = sagas.saveEntity('talent', { name: 'Foo' }, mapper, false)

    let result = generator.next()
    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')
    expect(result.value).toEqual(
      call(
        fetchLib.post,
        'https://api.test.com/event-service/admin/talent',
        { name: 'Foo' },
        'some-token'
      )
    )

    expect(mapper).toHaveBeenCalledWith({ name: 'Foo' })

    result = generator.next({ entity: { id: 'server-id' } })
    expect(result.value).toEqual({ id: 'server-id' })

    expect(result.done).toEqual(true)
  })

  it('should save an existing entity', () => {
    const generator = sagas.saveEntity(
      'talent',
      { id: 'talent-id', name: 'Foo' },
      mapper,
      true
    )

    let result = generator.next()
    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')
    expect(result.value).toEqual(
      call(
        fetchLib.put,
        'https://api.test.com/event-service/admin/talent/talent-id',
        { id: 'talent-id', name: 'Foo' },
        'some-token'
      )
    )

    expect(mapper).toHaveBeenCalledWith({ name: 'Foo' })

    result = generator.next({ entity: { id: 'server-id' } })
    expect(result.value).toEqual({ id: 'server-id' })

    expect(result.done).toEqual(true)
  })
})