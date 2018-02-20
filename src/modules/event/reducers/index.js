import * as reduxLib from '_src/shared/lib/redux'

import * as talent from './talent'

export const moduleName = 'event'

export const reducer = talent.reducer

export const selectors = reduxLib.mapSelectors(talent.selectors, moduleName)
