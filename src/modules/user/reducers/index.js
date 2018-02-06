import * as reduxLib from '_src/lib/redux'

import * as user from './user'

export const moduleName = 'user'
export const reducer = user.reducer
export const selectors = reduxLib.mapSelectors(user.selectors, moduleName)
