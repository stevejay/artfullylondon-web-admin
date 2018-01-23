import { handleActions } from 'redux-actions'

import * as appActionTypes from '_src/constants/action/app'

const initialState = {
  shouldUpdate: false
}

export default handleActions(
  {
    [appActionTypes.APP_SHOULD_UPDATE]: (state, action) => ({
      ...state,
      shouldUpdate: true
    })
  },
  initialState
)
