import { combineReducers } from 'redux'

import * as reduxLib from '_src/lib/redux'

import * as venueMonitor from './venue-monitor'
import * as venueEventMonitors from './venue-event-monitors'

export const moduleName = 'venue'

export const reducer = combineReducers({
  [venueMonitor.moduleName]: venueMonitor.reducer,
  [venueEventMonitors.moduleName]: venueEventMonitors.reducer
})

export const selectors = reduxLib.mapSelectors(
  reduxLib.combineSelectors(
    reduxLib.mapSelectors(venueMonitor.selectors, venueMonitor.moduleName),
    reduxLib.mapSelectors(
      venueEventMonitors.selectors,
      venueEventMonitors.moduleName
    )
  ),
  moduleName
)
