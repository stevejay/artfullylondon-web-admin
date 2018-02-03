import { handleActions } from 'redux-actions'

import { types } from '_src/store/actions/server-constant'
import * as serverConstantLib from '_src/lib/server-constant'
import serverConstants from './server-constants.json'

export const module = 'serverConstants'

const initialState = {
  loading: true,
  ...serverConstantLib.mapServerConstantsData(serverConstants)
}

export const reducer = handleActions(
  {
    [types.FETCH_SERVER_CONSTANTS_SUCCEEDED]: (state, action) =>
      Object.assign(
        {},
        state,
        { loading: false },
        serverConstantLib.mapServerConstantsData(action.payload)
      )
  },
  initialState
)

export const selectors = {}
