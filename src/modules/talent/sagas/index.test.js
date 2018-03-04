import { put, call } from 'redux-saga/effects'
import log from 'loglevel'
import { cloneableGenerator } from 'redux-saga/utils'
import { startSubmit, stopSubmit, arrayPush, reset } from 'redux-form'

import * as sagas from './index'
import * as sagaLib from '_src/shared/lib/saga'
import * as talentActions from '../actions'
import * as validationLib from '_src/shared/lib/validation'
import * as talentConstants from '../constants'
import * as talentMapper from '../lib/mapper'
import entityType from '_src/domain/types/entity-type'
import normalise from '_src/shared/lib/normalise'
import { eventService } from '_src/modules/api'
import { actions as notificationActions } from '_src/modules/notification'

describe('createTalentForEntity', () => {
  const generator = cloneableGenerator(sagas.createTalentForEntity)(
    talentActions.createTalentForEntity({ name: 'foo' }, 'ParentFormName')
  )

  it('should prepare to create a talent', () => {
    let result = generator.next()
    expect(result.value).toEqual(
      put(startSubmit(talentConstants.EDIT_TALENT_FORM_NAME))
    )

    result = generator.next()
    expect(result.value).toEqual(
      call(normalise, { name: 'foo' }, talentConstants.TALENT_NORMALISER)
    )

    result = generator.next({ name: 'normalised foo' })
    expect(result.value).toEqual(
      call(
        validationLib.validate,
        { name: 'normalised foo' },
        talentConstants.TALENT_CONSTRAINT
      )
    )
  })

  it('should successfully create a talent', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()
    expect(result.value).toEqual(
      call(
        eventService.saveEntity,
        entityType.TALENT,
        { name: 'normalised foo' },
        talentMapper.mapSubmittedValues,
        false
      )
    )

    result = generatorClone.next({
      id: 'server-id',
      commonRole: 'Some Common Role'
    })
    expect(result.value).toEqual(
      put(
        arrayPush('ParentFormName', 'talents', {
          commonRole: 'Some Common Role',
          id: 'server-id',
          key: 'server-id',
          roles: 'Some Common Role',
          characters: ''
        })
      )
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(stopSubmit(talentConstants.EDIT_TALENT_FORM_NAME))
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(reset(talentConstants.EDIT_TALENT_FORM_NAME))
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(sagaLib.returnAsPromise(null, { thunk: true }))
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
    expect(result.value).toEqual(
      put(
        notificationActions.addErrorNotification(
          'Save Failed',
          'deliberately thrown'
        )
      )
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      call(
        sagaLib.submitErrorHandler,
        error,
        talentConstants.EDIT_TALENT_FORM_NAME
      )
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })
})
