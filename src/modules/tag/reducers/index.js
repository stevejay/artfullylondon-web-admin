import * as reduxLib from '_src/lib/redux'

import * as tag from './tag'

export const moduleName = 'tags'
export const reducer = tag.reducer
export const selectors = reduxLib.mapSelectors(tag.selectors, moduleName)
