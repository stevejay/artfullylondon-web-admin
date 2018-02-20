import { put, call } from 'redux-saga/effects'
import log from 'loglevel'
import { cloneableGenerator } from 'redux-saga/utils'
import { startSubmit, stopSubmit } from 'redux-form'

import * as sagas from './index'
import * as sagaLib from '_src/shared/lib/saga'
import * as dateLib from '_src/shared/lib/date'
import * as entityActions from '../actions'
import * as validationLib from '_src/shared/lib/validation'
import { eventService } from '_src/modules/api'
import history from '_src/shared/lib/history'
import normalise from '_src/shared/lib/normalise'
import { actions as notificationActions } from '_src/modules/notification'

dateLib.getDateNowForDatabase = jest.fn().mockReturnValue('2018/01/01')

describe('getEntity', () => {
  const generator = cloneableGenerator(sagas.getEntity)(
    entityActions.getEntity('talent', 'some-id')
  )

  it('should prepare to get an entity', () => {
    let result = generator.next()
    expect(result.value).toEqual(put(entityActions.clearEntity()))

    result = generator.next()
    expect(result.value).toEqual(put(entityActions.getEntityStarted('some-id')))

    result = generator.next()
    expect(result.value).toEqual(
      call(eventService.getEntity, 'talent', 'some-id')
    )
  })

  it('should successfully get an entity', () => {
    const generatorClone = generator.clone()
    const entity = { name: 'Some Name' }

    let result = generatorClone.next(entity)
    expect(result.value).toEqual(
      put(entityActions.getEntitySucceeded('talent', entity))
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })

  it('should handle an error being raised', () => {
    const generatorClone = generator.clone()
    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)
    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()
    expect(result.value).toEqual(put(entityActions.getEntityFailed()))

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })
})

describe('saveEntity', () => {
  const normaliser = jest.fn()
  const constraint = jest.fn()
  const mapper = jest.fn().mockImplementation(x => x)

  it('should create an entity', () => {
    const generator = sagas.saveEntity(
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
    expect(result.value).toEqual(
      call(
        eventService.saveEntity,
        'talent',
        { name: 'normalised foo' },
        mapper,
        false
      )
    )

    result = generator.next({ id: 'server-id' })
    expect(result.value).toEqual(put(stopSubmit('SomeFormName')))

    result = generator.next()
    expect(result.value).toEqual(call(history.push, '/talent/server-id'))

    result = generator.next()
    expect(result.done).toEqual(true)
  })

  it('should update an entity', () => {
    const generator = sagas.saveEntity(
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
    expect(result.value).toEqual(
      call(
        eventService.saveEntity,
        'talent',
        { name: 'normalised foo', id: 'existing-id' },
        mapper,
        true
      )
    )

    result = generator.next({ id: 'server-id' })
    expect(result.value).toEqual(put(stopSubmit('SomeFormName')))

    result = generator.next()
    expect(result.value).toEqual(call(history.push, '/talent/server-id'))

    result = generator.next()
    expect(result.done).toEqual(true)
  })

  it('should handle an error being raised', () => {
    const generator = sagas.saveEntity(
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

    result = generator.next()
    expect(result.done).toEqual(true)
  })
})
