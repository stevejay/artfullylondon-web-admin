import _ from 'lodash'
import { handleActions } from 'redux-actions'
import * as types from '_src/constants/monitors'

const initialState = {
  getVenueEventMonitorsInProgress: false,
  venueEventMonitors: []
}

export default handleActions(
  {
    [types.GET_VENUE_EVENT_MONITORS_STARTED]: state => ({
      ...state,
      venueEventMonitors: [],
      getVenueEventMonitorsInProgress: true
    }),
    [types.GET_VENUE_EVENT_MONITORS_SUCCEEDED]: (state, action) => {
      const venueEventMonitors = action.payload.items.map(monitor => {
        monitor.key = monitor.externalEventId
        return monitor
      })

      return {
        ...state,
        hasIgnoredEventMonitors: venueEventMonitors.some(
          monitor => monitor.isIgnored
        ),
        venueEventMonitors,
        getVenueEventMonitorsInProgress: false
      }
    },
    [types.GET_VENUE_EVENT_MONITORS_FAILED]: state => ({
      ...state,
      getVenueEventMonitorsInProgress: false
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

      const newMonitor = Object.assign(
        {},
        state.venueEventMonitors[monitorIndex],
        { isIgnored, hasChanged }
      )

      newMonitors.splice(monitorIndex, 1, newMonitor)

      return {
        ...state,
        venueEventMonitors: newMonitors
      }
    }
  },
  initialState
)
