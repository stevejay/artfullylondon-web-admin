import * as reduxLib from '_src/shared/lib/redux'

import * as event from './event'

export const moduleName = 'event'

export const reducer = event.reducer

export const selectors = reduxLib.mapSelectors(event.selectors, moduleName)
