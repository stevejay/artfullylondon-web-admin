import deepFreeze from 'deep-freeze'

import { reducer, selectors } from './talent'
import * as eventActions from '../actions'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})
  expect(actual).toEqual({ talentId: null })
})

it('should handle adding a notification', () => {
  const state = deepFreeze({
    talentId: null
  })

  const actual = reducer(
    state,
    eventActions.updateSelectedTalent('some-talent-id')
  )

  expect(actual).toEqual({ talentId: 'some-talent-id' })
})

describe('selectors', () => {
  describe('selectedTalentId', () => {
    it('should get the value', () => {
      const state = { talentId: 2 }
      const actual = selectors.selectedTalentId(state)
      expect(actual).toEqual(2)
    })
  })
})
