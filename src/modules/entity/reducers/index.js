import * as reduxLib from '_src/lib/redux'
import * as entity from './entity'

export const moduleName = 'entity'

export const reducer = entity.reducer

export const selectors = reduxLib.mapSelectors(entity.selectors, moduleName)

// export const reducer = combineReducers({
//   [entity.moduleName]: entity.reducer,
//   [entityForEdit.moduleName]: entityForEdit.reducer
// })

// export const selectors = reduxLib.mapSelectors(
//   reduxLib.combineSelectors(
//     reduxLib.mapSelectors(entity.selectors, entity.moduleName),
//     reduxLib.mapSelectors(entityForEdit.selectors, entityForEdit.moduleName)
//   ),
//   moduleName
// )
