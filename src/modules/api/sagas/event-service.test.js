import { call } from 'redux-saga/effects'

import * as sagas from './event-service'
import * as fetchLib from '_src/shared/lib/fetch'
import { getAuthTokenForCurrentUser } from '_src/modules/user'

describe('getEntity', () => {
  it('should get an entity', () => {
    const generator = sagas.getEntity(entityType.TALENT, 'talent-id')

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

describe('getSummaryEntity', () => {
  it('should get a summary entity', () => {
    const generator = sagas.getSummaryEntity(entityType.TALENT, 'talent-id')

    let result = generator.next()
    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')
    expect(result.value).toEqual(
      call(
        fetchLib.get,
        'https://api.test.com/event-service/public/talent?ids=talent-id',
        'some-token'
      )
    )

    result = generator.next({ entities: [{ id: 'server-id' }] })
    expect(result.value).toEqual({ id: 'server-id' })

    expect(result.done).toEqual(true)
  })
})

describe('saveEntity', () => {
  const mapper = jest.fn(value => value)

  it('should save a new entity', () => {
    const generator = sagas.saveEntity(entityType.TALENT, { name: 'Foo' }, mapper, false)

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
      entityType.TALENT,
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
