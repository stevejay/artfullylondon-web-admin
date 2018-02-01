import { handleActions } from 'redux-actions'

import { types } from '_src/store/actions/server-constants'
import * as serverConstantsLib from '_src/lib/server-constants'
import serverConstants from './server-constants.json'

const initialState = Object.assign(
  { loading: true },
  serverConstantsLib.mapServerConstantsData(serverConstants)
)

export default handleActions(
  {
    [types.FETCH_SERVER_CONSTANTS_SUCCEEDED]: (state, action) =>
      Object.assign(
        {},
        state,
        { loading: false },
        serverConstantsLib.mapServerConstantsData(action.payload)
      )
  },
  initialState
)
