import deepFreeze from 'deep-freeze'

import { reducer } from '_src/store/reducers/server-constant'
import * as serverConstantLib from '_src/lib/server-constant'
import { serverConstantActions } from '_src/store'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})

  expect(actual).toEqual(
    expect.objectContaining({
      loading: true
    })
  )

  expect(actual).toHaveProperty('heroImage')
  expect(actual).toHaveProperty('namedClosuresDropdownOptions')
  expect(actual).toHaveProperty('namedClosuresLookup')
})

it('should handle a fetch server constants succeeded action', () => {
  serverConstantLib.mapServerConstantsData = jest
    .fn()
    .mockImplementation(data => data)

  const state = deepFreeze({
    loading: true,
    heroImage: { name: 'old name' }
  })

  const actual = reducer(
    state,
    serverConstantActions.fetchServerConstantsSucceeded({
      heroImage: { name: 'new name' }
    })
  )

  expect(actual).toEqual({
    loading: false,
    heroImage: { name: 'new name' }
  })
})
