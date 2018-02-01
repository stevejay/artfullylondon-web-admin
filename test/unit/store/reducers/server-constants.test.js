import deepFreeze from 'deep-freeze'

import serverConstantsReducer from '_src/store/reducers/server-constants'
import * as serverConstantsLib from '_src/lib/server-constants'
import * as serverConstantsActions from '_src/store/actions/server-constants'

it('should have the correct initial state', () => {
  const actual = serverConstantsReducer(undefined, {})

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
  serverConstantsLib.mapServerConstantsData = jest
    .fn()
    .mockImplementation(data => data)

  const state = deepFreeze({
    loading: true,
    heroImage: { name: 'old name' }
  })

  const actual = serverConstantsReducer(
    state,
    serverConstantsActions.fetchServerConstantsSucceeded({
      heroImage: { name: 'new name' }
    })
  )

  expect(actual).toEqual({
    loading: false,
    heroImage: { name: 'new name' }
  })
})
