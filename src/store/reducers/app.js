import { handleActions } from 'redux-actions'

import { types } from '_src/store/actions/app'

export const module = 'app'

const initialState = {
  shouldUpdate: false
}

export const reducer = handleActions(
  {
    [types.APP_SHOULD_UPDATE]: state => ({
      ...state,
      shouldUpdate: true
    })
  },
  initialState
)

export const selectors = {
  shouldUpdate: state => state.shouldUpdate
}
