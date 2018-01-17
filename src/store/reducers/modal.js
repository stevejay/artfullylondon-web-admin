import { handleActions } from 'redux-actions'
import * as types from '_src/constants/modal'

const initialState = {
  showSidenav: false,
  showQuicksearch: false
}

export default handleActions(
  {
    [types.SHOW_SIDENAV]: state => ({
      ...state,
      showSidenav: true
    }),
    [types.HIDE_SIDENAV]: state => ({
      ...state,
      showSidenav: false
    }),
    [types.SHOW_QUICKSEARCH]: state => ({
      ...state,
      showQuicksearch: true
    }),
    [types.HIDE_QUICKSEARCH]: state => ({
      ...state,
      showQuicksearch: false
    })
  },
  initialState
)
