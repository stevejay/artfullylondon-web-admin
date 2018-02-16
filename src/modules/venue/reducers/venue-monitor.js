import { handleActions } from 'redux-actions'

import { types } from '../actions'

export const moduleName = 'venueMonitor'

const initialState = {
  venueMonitor: null,
  getInProgress: false,
  getFailed: false
}

export const reducer = handleActions(
  {
    [types.GET_VENUE_MONITOR_STARTED]: () => ({
      ...initialState,
      getInProgress: true
    }),
    [types.GET_VENUE_MONITOR_SUCCEEDED]: (state, action) => ({
      ...initialState,
      getInProgress: false,
      venueMonitor: action.payload
    }),
    [types.GET_VENUE_MONITOR_FAILED]: () => ({
      ...initialState,
      getFailed: true
    }),
    [types.UPDATE_VENUE_MONITOR_SUCCEEDED]: (state, action) => ({
      ...state,
      venueMonitor: action.payload
    })
  },
  initialState
)

export const selectors = {
  venueMonitor: state => state.venueMonitor,
  gettingVenueMonitor: state => state.getInProgress,
  failedToGetVenueMonitor: state => state.getFailed
}
