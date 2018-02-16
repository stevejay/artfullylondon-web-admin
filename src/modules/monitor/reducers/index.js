import { combineReducers } from 'redux'

import * as reduxLib from '_src/lib/redux'

import * as venueMonitors from './venue-monitor'
import * as venueEventMonitors from './venue-event-monitors'

export const moduleName = 'monitor'

export const reducer = combineReducers({
  [venueMonitors.moduleName]: venueMonitors.reducer,
  [venueEventMonitors.moduleName]: venueEventMonitors.reducer
})

export const selectors = reduxLib.mapSelectors(
  reduxLib.combineSelectors(
    reduxLib.mapSelectors(venueMonitors.selectors, venueMonitors.moduleName),
    reduxLib.mapSelectors(
      venueEventMonitors.selectors,
      venueEventMonitors.moduleName
    )
  ),
  moduleName
)
