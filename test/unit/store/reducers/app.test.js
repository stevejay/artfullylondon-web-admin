import deepFreeze from 'deep-freeze'

import * as appActions from '_src/store/actions/app'
import appReducer from '_src/store/reducers/app'

it('should have the correct initial state', () => {
  const actual = appReducer(undefined, {})
  expect(actual).toEqual({ shouldUpdate: false })
})

it('should handle an app should update message', () => {
  const state = deepFreeze({ shouldUpdate: false })

  const actual = appReducer(state, appActions.appShouldUpdate())

  expect(actual).toEqual({ shouldUpdate: true })
})
