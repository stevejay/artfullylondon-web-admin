import { put, call } from 'redux-saga/effects'
import { get, put as httpPut, post } from '_src/lib/fetch'
import log from 'loglevel'
import { cloneableGenerator } from 'redux-saga/utils'
import { startSubmit, stopSubmit } from 'redux-form'

import * as sagas from './index'
import * as sagaLib from '_src/lib/saga'
import * as dateLib from '_src/lib/date'
import * as entityActions from '_src/modules/entity/actions'
import * as validationLib from '_src/lib/validation'
import history from '_src/history'
import normalise from '_src/lib/normalise'
import { getAuthTokenForCurrentUser } from '_src/modules/user'
import { actions as notificationActions } from '_src/modules/notification'

// Fix the created dates on entities:
dateLib.getDateNowForDatabase = jest.fn().mockReturnValue('2018/01/01')

describe('getEntity', () => {
  it('should successfully get an entity', () => {
    const generator = sagas.getEntity(
      entityActions.getEntity('talent', 'some-id')
    )

    let result = generator.next()

    expect(result.value).toEqual(put(entityActions.clearEntity()))

    result = generator.next()

    expect(result.value).toEqual(put(entityActions.getEntityStarted('some-id')))

    result = generator.next()

    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')

    expect(result.value).toEqual(
      call(
        get,
        'https://api.test.com/event-service/admin/edit/talent/some-id',
        'some-token'
      )
    )

    result = generator.next({ entity: { name: 'Some Name' } })

    expect(result.value).toEqual(
      put(entityActions.getEntitySucceeded('talent', { name: 'Some Name' }))
    )

    result = generator.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an error being raised', () => {
    const generator = sagas.getEntity(
      entityActions.getEntity('talent', 'some-id')
    )

    let result = generator.next()

    expect(result.value).toEqual(put(entityActions.clearEntity()))

    result = generator.next()

    expect(result.value).toEqual(put(entityActions.getEntityStarted('some-id')))

    const error = new Error('deliberately thrown')
    result = generator.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generator.next()

    expect(result.value).toEqual(put(entityActions.getEntityFailed()))

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})

describe('saveEntity', () => {
  const normaliser = jest.fn()
  const constraint = jest.fn()
  const mapper = jest.fn().mockImplementation(x => x)

  it('should create an entity', () => {
    const generator = cloneableGenerator(sagas.saveEntity)(
      entityActions.saveEntity(
        'talent',
        { name: 'foo' },
        false,
        'SomeFormName',
        normaliser,
        constraint,
        mapper
      )
    )

    let result = generator.next()

    expect(result.value).toEqual(put(startSubmit('SomeFormName')))

    result = generator.next()

    expect(result.value).toEqual(call(normalise, { name: 'foo' }, normaliser))

    result = generator.next({ name: 'normalised foo' })

    expect(result.value).toEqual(
      call(validationLib.validate, { name: 'normalised foo' }, constraint)
    )

    result = generator.next()

    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')

    expect(result.value).toEqual(
      call(
        post,
        'https://api.test.com/event-service/admin/talent',
        {
          name: 'normalised foo'
        },
        'some-token'
      )
    )

    result = generator.next({ entity: { id: 'server-id' } })

    expect(result.value).toEqual(put(stopSubmit('SomeFormName')))

    result = generator.next()

    expect(result.value).toEqual(call(history.push, '/talent/server-id'))

    result = generator.next()

    expect(result.done).toEqual(true)
  })

  it('should update an entity', () => {
    const generator = cloneableGenerator(sagas.saveEntity)(
      entityActions.saveEntity(
        'talent',
        { name: 'foo' },
        true,
        'SomeFormName',
        normaliser,
        constraint,
        mapper
      )
    )

    let result = generator.next()

    expect(result.value).toEqual(put(startSubmit('SomeFormName')))

    result = generator.next()

    expect(result.value).toEqual(call(normalise, { name: 'foo' }, normaliser))

    result = generator.next({ name: 'normalised foo', id: 'existing-id' })

    expect(result.value).toEqual(
      call(
        validationLib.validate,
        { name: 'normalised foo', id: 'existing-id' },
        constraint
      )
    )

    result = generator.next()

    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')

    expect(result.value).toEqual(
      call(
        httpPut,
        'https://api.test.com/event-service/admin/talent/existing-id',
        {
          id: 'existing-id',
          name: 'normalised foo'
        },
        'some-token'
      )
    )

    result = generator.next({ entity: { id: 'server-id' } })

    expect(result.value).toEqual(put(stopSubmit('SomeFormName')))

    result = generator.next()

    expect(result.value).toEqual(call(history.push, '/talent/server-id'))

    result = generator.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an error being raised', () => {
    const generator = cloneableGenerator(sagas.saveEntity)(
      entityActions.saveEntity(
        'talent',
        { name: 'foo' },
        false,
        'SomeFormName',
        normaliser,
        constraint,
        mapper
      )
    )

    let result = generator.next()

    expect(result.value).toEqual(put(startSubmit('SomeFormName')))

    const error = new Error('deliberately thrown')
    result = generator.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generator.next()

    expect(result.value).toEqual(
      put(
        notificationActions.addErrorNotification(
          'Save Failed',
          'deliberately thrown'
        )
      )
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(sagaLib.submitErrorHandler, error, 'SomeFormName')
    )
  })
})
