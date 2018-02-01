import { handleActions } from 'redux-actions'

import { types } from '_src/store/actions/app'

const initialState = {
  shouldUpdate: false
}

export default handleActions(
  {
    [types.APP_SHOULD_UPDATE]: state => ({
      ...state,
      shouldUpdate: true
    })
  },
  initialState
)
