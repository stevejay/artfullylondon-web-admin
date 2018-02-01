import { handleActions } from 'redux-actions'

import { types } from '_src/store/actions/server-constant'
import * as serverConstantLib from '_src/lib/server-constant'
import serverConstants from './server-constants.json'

const initialState = Object.assign(
  { loading: true },
  serverConstantLib.mapServerConstantsData(serverConstants)
)

export default handleActions(
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
