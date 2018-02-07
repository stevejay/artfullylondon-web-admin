import { handleActions } from 'redux-actions'
import * as types from '_src/constants/monitors'

const initialState = {
  venueMonitor: null,
  getInProgress: false,
  getFailed: false
}

export default handleActions(
  {
    [types.GET_VENUE_MONITOR_STARTED]: state => ({
      ...state,
      venueMonitor: null,
      getInProgress: true,
      getFailed: false
    }),
    [types.GET_VENUE_MONITOR_SUCCEEDED]: (state, action) => {
      const venueMonitor = action.payload.entity
      venueMonitor.key = venueMonitor.venueId

      return {
        ...state,
        venueMonitor,
        getInProgress: false
      }
    },
    [types.GET_VENUE_MONITOR_FAILED]: state => ({
      ...state,
      getInProgress: false,
      getFailed: true
    })
  },
  initialState
)
