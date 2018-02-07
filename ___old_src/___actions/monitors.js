import { createAction } from 'redux-actions'
import * as types from '_src/constants/monitors'

export const getVenueEventMonitors = createAction(
  types.GET_VENUE_EVENT_MONITORS
)

export const getVenueEventMonitor = createAction(types.GET_VENUE_EVENT_MONITOR)

export const updateVenueEventMonitor = createAction(
  types.UPDATE_VENUE_EVENT_MONITOR
)

export const changeIgnoredVenueEventMonitorsVisibility = createAction(
  types.CHANGE_IGNORED_VENUE_EVENT_MONITORS_VISIBILITY
)

export const getVenueMonitor = createAction(types.GET_VENUE_MONITOR)
export const updateVenueMonitor = createAction(types.UPDATE_VENUE_MONITOR)
