import { handleActions } from 'redux-actions'

import * as arrayLib from '_src/shared/lib/array'
import { types } from '../actions'

export const moduleName = 'venueEventMonitors'

const initialState = {
  monitors: [],
  getInProgress: false,
  getFailed: false
}

// TODO find a way to need only one monitor reducer

export const reducer = handleActions(
  {
    [types.GET_VENUE_EVENT_MONITORS_STARTED]: () => ({
      ...initialState,
      getInProgress: true
    }),
    [types.GET_VENUE_EVENT_MONITORS_SUCCEEDED]: (state, action) => ({
      ...initialState,
      getInProgress: false,
      monitors: action.payload
    }),
    [types.GET_VENUE_EVENT_MONITORS_FAILED]: () => ({
      ...initialState,
      getFailed: true
    }),
    [types.UPDATE_VENUE_EVENT_MONITOR_SUCCEEDED]: (state, action) => ({
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
  venueEventMonitors: state => state.monitors,
  gettingVenueEventMonitors: state => state.getInProgress,
  failedToGetVenueEventMonitors: state => state.getFailed
}
