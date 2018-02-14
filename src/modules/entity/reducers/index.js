import * as reduxLib from '_src/lib/redux'
import * as entity from './entity'

export const moduleName = 'entity'
export const reducer = entity.reducer
export const selectors = reduxLib.mapSelectors(entity.selectors, moduleName)
