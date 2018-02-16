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
