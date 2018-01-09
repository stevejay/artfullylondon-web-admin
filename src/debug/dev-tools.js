import React from 'react'
import { compose } from 'redux'
import { createDevTools, persistState } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import window from 'global/window'

const devTools = createDevTools(<LogMonitor />)

export function devToolsApplier (middlewareApplier) {
  return compose(
    middlewareApplier,
    devTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )
}

export default devTools
