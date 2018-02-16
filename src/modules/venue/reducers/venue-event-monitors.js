import { handleActions } from 'redux-actions'
import _ from 'lodash'

import * as arrayLib from '_src/lib/array'
import { types } from '../actions'

export const moduleName = 'venueEventMonitors'

const initialState = {
  venueEventMonitors: null,
  getInProgress: false,
  getFailed: false
}

export const reducer = handleActions(
  {
    [types.GET_VENUE_EVENT_MONITORS_STARTED]: () => ({
      ...initialState,
      getInProgress: true
    }),
    [types.GET_VENUE_EVENT_MONITORS_SUCCEEDED]: (state, action) => ({
      ...initialState,
      getInProgress: false,
      venueEventMonitors: action.payload
    }),
    [types.GET_VENUE_EVENT_MONITORS_FAILED]: () => ({
      ...initialState,
      getFailed: true
    }),
    [types.UPDATE_VENUE_EVENT_MONITOR_SUCCEEDED]: (state, action) => ({
      ...state,
      venueEventMonitors: arrayLib.updateElementByKey(
        state.venueEventMonitors,
        action.payload.key,
        action.payload
      )
    })
  },
  initialState
)

export const selectors = {
  venueEventMonitors: state => state.venueEventMonitors,
  gettingVenueEventMonitors: state => state.getInProgress,
  failedToGetVenueEventMonitors: state => state.getFailed,
  hasIgnoredVenueEventMonitors: state =>
    state.venueEventMonitors.some(monitor => monitor.isIgnored)
}
