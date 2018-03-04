import { put, call } from 'redux-saga/effects'
import log from 'loglevel'
import { cloneableGenerator } from 'redux-saga/utils'
import { change } from 'redux-form'

import * as sagas from './index'
import * as eventActions from '../actions'
import * as sagaLib from '_src/shared/lib/saga'
import entityType from '_src/domain/types/entity-type'
import { eventService } from '_src/modules/api'
import { actions as notificationActions } from '_src/modules/notification'
import { SummaryTalent } from '_src/domain/talent'

describe('getSubEntity', () => {
  const generator = cloneableGenerator(sagas.getSubEntity)(
    eventActions.getSubEntity(entityType.TALENT, 'some-id', 'ParentFormName')
  )

  it('should prepare to get a sub entity', () => {
    let result = generator.next()

    expect(result.value).toEqual(
      call(eventService.getSummaryEntity, entityType.TALENT, 'some-id')
    )
  })

  it('should successfully get a sub entity', () => {
    const generatorClone = generator.clone()
    const entity = { name: 'Some Name' }

    let result = generatorClone.next(entity)
    expect(result.value).toEqual(
      put(change('ParentFormName', 'talent', new SummaryTalent(entity)))
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
          'Load Failed',
          'Failed to load talent entity'
        )
      )
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })
})
