import deepFreeze from 'deep-freeze'

import { appActions } from '_src/store'
import { reducer } from '_src/store/reducers/app'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})
  expect(actual).toEqual({ shouldUpdate: false })
})

it('should handle an app should update message', () => {
  const state = deepFreeze({ shouldUpdate: false })
  const actual = reducer(state, appActions.appShouldUpdate())
  expect(actual).toEqual({ shouldUpdate: true })
})
