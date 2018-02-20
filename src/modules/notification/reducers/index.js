import * as reduxLib from '_src/shared/lib/redux'

import * as notification from './notification'

export const moduleName = 'notification'

export const reducer = notification.reducer

export const selectors = reduxLib.mapSelectors(
  notification.selectors,
  moduleName
)
