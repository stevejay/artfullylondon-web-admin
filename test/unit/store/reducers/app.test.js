import deepFreeze from 'deep-freeze'

import * as appActionTypes from '_src/constants/action/app'
import appReducer from '_src/store/reducers/app'

it('should have the correct initial state', () => {
  const actual = appReducer(undefined, {})
  expect(actual).toEqual({ shouldUpdate: false })
})

it('should handle an app should update message', () => {
  const state = deepFreeze({ shouldUpdate: false })

  const actual = appReducer(state, {
    type: appActionTypes.APP_SHOULD_UPDATE
  })

  expect(actual).toEqual({ shouldUpdate: true })
})
