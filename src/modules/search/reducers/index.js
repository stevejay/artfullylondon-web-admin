import * as reduxLib from '_src/shared/lib/redux'

import * as search from './search'

export const moduleName = 'search'
export const reducer = search.reducer
export const selectors = reduxLib.mapSelectors(search.selectors, moduleName)
