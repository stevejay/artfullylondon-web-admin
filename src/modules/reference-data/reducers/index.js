import * as reduxLib from '_src/shared/lib/redux'

import * as referenceData from './reference-data'

export const moduleName = 'referenceData'

export const reducer = referenceData.reducer

export const selectors = reduxLib.mapSelectors(
  referenceData.selectors,
  moduleName
)
