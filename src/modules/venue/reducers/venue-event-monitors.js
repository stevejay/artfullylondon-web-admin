import { handleActions } from 'redux-actions'
import _ from 'lodash'

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
    [types.UPDATE_VENUE_EVENT_MONITOR_SUCCEEDED]: (state, action) => {
      const { externalEventId, isIgnored, hasChanged } = action.payload

      const monitorIndex = _.findIndex(
        state.venueEventMonitors,
        monitor => monitor.externalEventId === externalEventId
      )

      if (monitorIndex === -1) {
        return state
      }

      const newMonitors = state.venueEventMonitors.slice()

      const newMonitor = {
        ...state.venueEventMonitors[monitorIndex],
        isIgnored,
        hasChanged
      }

      newMonitors.splice(monitorIndex, 1, newMonitor)

      return {
        ...state,
        venueEventMonitors: newMonitors
      }
    }
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
