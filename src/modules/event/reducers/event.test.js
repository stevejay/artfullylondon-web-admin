import deepFreeze from 'deep-freeze'

import { reducer, selectors } from './event'
import * as eventActions from '../actions'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})
  expect(actual).toEqual({ selectedTalentId: null })
})

it('should handle updating the selected talent', () => {
  const state = deepFreeze({
    selectedTalentId: null
  })

  const actual = reducer(
    state,
    eventActions.updateSelectedTalent('some-talent-id')
  )

  expect(actual).toEqual({ selectedTalentId: 'some-talent-id' })
})

describe('selectors', () => {
  describe('selectedTalentId', () => {
    it('should get the value', () => {
      const state = { selectedTalentId: 2 }
      const actual = selectors.selectedTalentId(state)
      expect(actual).toEqual(2)
    })
  })
})
