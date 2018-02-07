import deepFreeze from 'deep-freeze'

import { reducer } from '_src/modules/reference-data/reducers/reference-data'
import * as referenceDataLib
  from '_src/modules/reference-data/lib/reference-data'
import * as referenceActions from '_src/modules/reference-data/actions'

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
  referenceDataLib.mapReferenceData = jest.fn().mockImplementation(data => data)

  const state = deepFreeze({
    loading: true,
    heroImage: { name: 'old name' }
  })

  const actual = reducer(
    state,
    referenceActions.fetchReferenceDataSucceeded({
      heroImage: { name: 'new name' }
    })
  )

  expect(actual).toEqual({
    loading: false,
    heroImage: { name: 'new name' }
  })
})
