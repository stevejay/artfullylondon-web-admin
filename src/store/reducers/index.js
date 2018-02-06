import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import * as reduxLib from '_src/lib/redux'
import * as entityForEdit from './entity-for-edit'
import * as entity from './entity'
import * as notification from '_src/modules/notification'
import * as dashboard from '_src/modules/dashboard'
import * as tag from '_src/modules/tag'
import * as user from '_src/modules/user'
import * as search from '_src/modules/search'
import * as serverConstant from './server-constant'

export const reducer = combineReducers({
  form: formReducer,
  [notification.moduleName]: notification.reducer,
  [dashboard.moduleName]: dashboard.reducer,
  [user.moduleName]: user.reducer,
  [tag.moduleName]: tag.reducer,
  [search.moduleName]: search.reducer,
  [entityForEdit.module]: entityForEdit.reducer,
  [entity.module]: entity.reducer,
  [serverConstant.module]: serverConstant.reducer
})

export const selectors = reduxLib.combineSelectors(
  notification.selectors,
  user.selectors,
  dashboard.selectors,
  tag.selectors,
  search.selectors,
  reduxLib.mapSelectors(entityForEdit.selectors, entityForEdit.module),
  reduxLib.mapSelectors(entity.selectors, entity.module),
  reduxLib.mapSelectors(serverConstant.selectors, serverConstant.module)
)
