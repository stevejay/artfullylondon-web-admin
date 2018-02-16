import { handleActions } from 'redux-actions'

import * as arrayLib from '_src/lib/array'
import { types } from '../actions'

export const moduleName = 'venueMonitors'

const initialState = {
  monitors: [],
  getInProgress: false,
  getFailed: false
}

export const reducer = handleActions(
  {
    [types.GET_VENUE_MONITORS_STARTED]: () => ({
      ...initialState,
      getInProgress: true
    }),
    [types.GET_VENUE_MONITORS_SUCCEEDED]: (state, action) => ({
      ...initialState,
      getInProgress: false,
      monitors: action.payload
    }),
    [types.GET_VENUE_MONITORS_FAILED]: () => ({
      ...initialState,
      getFailed: true
    }),
    [types.UPDATE_VENUE_MONITOR_SUCCEEDED]: (state, action) => ({
      ...state,
      monitors: arrayLib.updateElementByKey(
        state.monitors,
        action.payload.key,
        action.payload
      )
    })
  },
  initialState
)

export const selectors = {
  venueMonitors: state => state.monitors,
  gettingVenueMonitors: state => state.getInProgress,
  failedToGetVenueMonitors: state => state.getFailed
}
