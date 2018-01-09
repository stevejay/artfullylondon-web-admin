import { handleActions } from 'redux-actions'
import * as types from '_src/constants/server-constants'
import serverConstants from './server-constants.json'
import * as serverConstantsLib from '_src/lib/server-constants'

// createData(content)
// {
//   // headerMenus: menus.filter(menu => menu.showWhenLoggedOut)
// };

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
    // [authTypes.LOG_IN_SUCCEEDED]: state => ({
    //   ...state,
    //   headerMenus: menus.filter(menu => menu.showWhenLoggedIn)
    // }),
    // [authTypes.LOGGED_OUT]: state => ({
    //   ...state,
    //   headerMenus: menus.filter(menu => menu.showWhenLoggedOut)
    // })
  },
  initialState
)
