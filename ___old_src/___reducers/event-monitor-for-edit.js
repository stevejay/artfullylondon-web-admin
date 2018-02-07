import { handleActions } from 'redux-actions'
import * as types from '_src/constants/monitors'

const initialState = {
  venueEventMonitor: null,
  getInProgress: false,
  getFailed: false
}

export default handleActions(
  {
    [types.GET_VENUE_EVENT_MONITOR_STARTED]: state => ({
      ...state,
      venueEventMonitor: null,
      getInProgress: true,
      getFailed: false
    }),
    [types.GET_VENUE_EVENT_MONITOR_SUCCEEDED]: (state, action) => {
      return {
        ...state,
        venueEventMonitor: action.payload.entity,
        getInProgress: false
      }
    },
    [types.GET_VENUE_EVENT_MONITOR_FAILED]: state => ({
      ...state,
      getInProgress: false,
      getFailed: true
    })
  },
  initialState
)
