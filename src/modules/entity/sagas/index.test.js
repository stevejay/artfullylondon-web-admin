import { put, call } from 'redux-saga/effects'
import { get, put as httpPut, post } from '_src/lib/fetch'
import log from 'loglevel'
import { cloneableGenerator } from 'redux-saga/utils'
import { startSubmit, stopSubmit } from 'redux-form'

import * as sagas from './index'
import * as sagaLib from '_src/lib/saga'
import * as dateLib from '_src/lib/date'
import * as entityActions from '_src/modules/entity/actions'
import * as formConstants from '_src/constants/form'
import * as validationLib from '_src/lib/validation'
import history from '_src/history'
import normalise from '_src/lib/normalise'
import talentConstraint from '_src/constants/talent-constraint'
import talentNormaliser from '_src/constants/talent-normaliser'
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

    expect(result.value).toEqual(
      put(entityActions.getEntityStarted('talent', 'some-id'))
    )

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

    expect(result.value).toEqual(
      put(entityActions.getEntityStarted('talent', 'some-id'))
    )

    const error = new Error('deliberately thrown')
    result = generator.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generator.next()

    expect(result.value).toEqual(put(entityActions.getEntityFailed('talent')))

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})

describe('saveEntity', () => {
  it('should create an entity', () => {
    const generator = cloneableGenerator(sagas.saveEntity)(
      entityActions.saveEntity('talent', { name: 'foo' }, false)
    )

    let result = generator.next()

    expect(result.value).toEqual(
      put(startSubmit(formConstants.EDIT_TALENT_FORM_NAME))
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(normalise, { name: 'foo' }, talentNormaliser)
    )

    result = generator.next({ name: 'normalised foo' })

    expect(result.value).toEqual(
      call(validationLib.validate, { name: 'normalised foo' }, talentConstraint)
    )

    result = generator.next()

    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')

    expect(result.value).toEqual(
      call(
        post,
        'https://api.test.com/event-service/admin/talent',
        {
          commonRole: undefined,
          createdDate: '2018/01/01',
          description: null,
          firstNames: '',
          images: [],
          lastName: '',
          links: [],
          status: undefined,
          talentType: undefined,
          updatedDate: '2018/01/01',
          version: NaN,
          weSay: ''
        },
        'some-token'
      )
    )

    result = generator.next({ entity: { id: 'server-id' } })

    expect(result.value).toEqual(
      put(stopSubmit(formConstants.EDIT_TALENT_FORM_NAME))
    )

    result = generator.next()

    expect(result.value).toEqual(call(history.push, '/talent/server-id'))

    result = generator.next()

    expect(result.done).toEqual(true)
  })

  it('should update an entity', () => {
    const generator = cloneableGenerator(sagas.saveEntity)(
      entityActions.saveEntity('talent', { name: 'foo' }, true)
    )

    let result = generator.next()

    expect(result.value).toEqual(
      put(startSubmit(formConstants.EDIT_TALENT_FORM_NAME))
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(normalise, { name: 'foo' }, talentNormaliser)
    )

    result = generator.next({ name: 'normalised foo', id: 'existing-id' })

    expect(result.value).toEqual(
      call(
        validationLib.validate,
        { name: 'normalised foo', id: 'existing-id' },
        talentConstraint
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
          commonRole: undefined,
          createdDate: '2018/01/01',
          description: null,
          firstNames: '',
          images: [],
          lastName: '',
          links: [],
          status: undefined,
          talentType: undefined,
          updatedDate: '2018/01/01',
          version: NaN,
          weSay: ''
        },
        'some-token'
      )
    )

    result = generator.next({ entity: { id: 'server-id' } })

    expect(result.value).toEqual(
      put(stopSubmit(formConstants.EDIT_TALENT_FORM_NAME))
    )

    result = generator.next()

    expect(result.value).toEqual(call(history.goBack))

    result = generator.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an error being raised', () => {
    const generator = cloneableGenerator(sagas.saveEntity)(
      entityActions.saveEntity('talent', { name: 'foo' }, false)
    )

    let result = generator.next()

    expect(result.value).toEqual(
      put(startSubmit(formConstants.EDIT_TALENT_FORM_NAME))
    )

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
      call(
        sagaLib.submitErrorHandler,
        error,
        formConstants.EDIT_TALENT_FORM_NAME
      )
    )
  })
})
