import * as reduxLib from '_src/lib/redux'

import * as dashboard from './dashboard'

export const moduleName = 'dashboard'
export const reducer = dashboard.reducer
export const selectors = reduxLib.mapSelectors(dashboard.selectors, moduleName)
