export const types = {
  GET_VENUE_EVENT_MONITORS: 'venue/GET_VENUE_EVENT_MONITORS',
  GET_VENUE_EVENT_MONITORS_STARTED: 'venue/GET_VENUE_EVENT_MONITORS_STARTED',
  GET_VENUE_EVENT_MONITORS_SUCCEEDED: 'venue/GET_VENUE_EVENT_MONITORS_SUCCEEDED',
  GET_VENUE_EVENT_MONITORS_FAILED: 'venue/GET_VENUE_EVENT_MONITORS_FAILED',
  UPDATE_VENUE_EVENT_MONITOR: 'venue/UPDATE_VENUE_EVENT_MONITOR',
  UPDATE_VENUE_EVENT_MONITOR_SUCCEEDED: 'venue/UPDATE_VENUE_EVENT_MONITOR_SUCCEEDED',
  GET_VENUE_MONITOR: 'venue/GET_VENUE_MONITOR',
  GET_VENUE_MONITOR_STARTED: 'venue/GET_VENUE_MONITOR_STARTED',
  GET_VENUE_MONITOR_SUCCEEDED: 'venue/GET_VENUE_MONITOR_SUCCEEDED',
  GET_VENUE_MONITOR_FAILED: 'venue/GET_VENUE_MONITOR_FAILED',
  UPDATE_VENUE_MONITOR: 'venue/UPDATE_VENUE_MONITOR',
  UPDATE_VENUE_MONITOR_SUCCEEDED: 'venue/UPDATE_VENUE_MONITOR_SUCCEEDED'
}

export const getVenueEventMonitors = venueId => ({
  type: types.GET_VENUE_EVENT_MONITORS,
  payload: { venueId }
})

export const getVenueEventMonitorsStarted = () => ({
  type: types.GET_VENUE_EVENT_MONITORS_STARTED
})

export const getVenueEventMonitorsSucceeded = json => ({
  type: types.GET_VENUE_EVENT_MONITORS_SUCCEEDED,
  payload: json
})

export const getVenueEventMonitorsFailed = () => ({
  type: types.GET_VENUE_EVENT_MONITORS_FAILED
})

export const updateVenueEventMonitor = values => ({
  type: types.UPDATE_VENUE_EVENT_MONITOR,
  payload: { values },
  meta: { thunk: true }
})

export const updateVenueEventMonitorSucceeded = values => ({
  type: types.UPDATE_VENUE_EVENT_MONITOR_SUCCEEDED,
  payload: values
})

export const getVenueMonitor = venueId => ({
  type: types.GET_VENUE_MONITOR,
  payload: { venueId }
})

export const getVenueMonitorStarted = () => ({
  type: types.GET_VENUE_MONITOR_STARTED
})

export const getVenueMonitorSucceeded = json => ({
  type: types.GET_VENUE_MONITOR_SUCCEEDED,
  payload: json
})

export const getVenueMonitorFailed = () => ({
  type: types.GET_VENUE_MONITOR_FAILED
})

export const updateVenueMonitor = values => ({
  type: types.UPDATE_VENUE_MONITOR,
  payload: { values },
  meta: { thunk: true }
})

export const updateVenueMonitorSucceeded = values => ({
  type: types.UPDATE_VENUE_MONITOR_SUCCEEDED,
  payload: values
})
