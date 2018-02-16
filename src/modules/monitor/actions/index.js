export const types = {
  GET_VENUE_EVENT_MONITORS: 'monitor/GET_VENUE_EVENT_MONITORS',
  GET_VENUE_EVENT_MONITORS_STARTED: 'monitor/GET_VENUE_EVENT_MONITORS_STARTED',
  GET_VENUE_EVENT_MONITORS_SUCCEEDED: 'monitor/GET_VENUE_EVENT_MONITORS_SUCCEEDED',
  GET_VENUE_EVENT_MONITORS_FAILED: 'monitor/GET_VENUE_EVENT_MONITORS_FAILED',
  UPDATE_VENUE_EVENT_MONITOR: 'monitor/UPDATE_VENUE_EVENT_MONITOR',
  UPDATE_VENUE_EVENT_MONITOR_SUCCEEDED: 'monitor/UPDATE_VENUE_EVENT_MONITOR_SUCCEEDED',
  GET_VENUE_MONITORS: 'monitor/GET_VENUE_MONITORS',
  GET_VENUE_MONITORS_STARTED: 'monitor/GET_VENUE_MONITORS_STARTED',
  GET_VENUE_MONITORS_SUCCEEDED: 'monitor/GET_VENUE_MONITORS_SUCCEEDED',
  GET_VENUE_MONITORS_FAILED: 'monitor/GET_VENUE_MONITORS_FAILED',
  UPDATE_VENUE_MONITOR: 'monitor/UPDATE_VENUE_MONITOR',
  UPDATE_VENUE_MONITOR_SUCCEEDED: 'monitor/UPDATE_VENUE_MONITOR_SUCCEEDED'
}

export const getVenueEventMonitors = venueId => ({
  type: types.GET_VENUE_EVENT_MONITORS,
  payload: { venueId }
})

export const getVenueEventMonitorsStarted = () => ({
  type: types.GET_VENUE_EVENT_MONITORS_STARTED
})

export const getVenueEventMonitorsSucceeded = monitors => ({
  type: types.GET_VENUE_EVENT_MONITORS_SUCCEEDED,
  payload: monitors
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

export const getVenueMonitors = venueId => ({
  type: types.GET_VENUE_MONITORS,
  payload: { venueId }
})

export const getVenueMonitorsStarted = () => ({
  type: types.GET_VENUE_MONITORS_STARTED
})

export const getVenueMonitorsSucceeded = monitors => ({
  type: types.GET_VENUE_MONITORS_SUCCEEDED,
  payload: monitors
})

export const getVenueMonitorsFailed = () => ({
  type: types.GET_VENUE_MONITORS_FAILED
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
