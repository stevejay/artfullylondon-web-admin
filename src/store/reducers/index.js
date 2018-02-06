import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import * as reduxLib from '_src/lib/redux'
import * as entityForEdit from './entity-for-edit'
import * as entity from './entity'
import * as notification from '_src/modules/notification'
import * as dashboard from '_src/modules/dashboard'
import * as user from '_src/modules/user'
import * as search from './search'
import * as serverConstant from './server-constant'
import * as tag from './tag'

export const reducer = combineReducers({
  form: formReducer,
  [notification.moduleName]: notification.reducer,
  [dashboard.moduleName]: dashboard.reducer,
  [user.moduleName]: user.reducer,

  [entityForEdit.module]: entityForEdit.reducer,
  [entity.module]: entity.reducer,
  [search.module]: search.reducer,
  [serverConstant.module]: serverConstant.reducer,
  [tag.module]: tag.reducer
})

export const selectors = reduxLib.combineSelectors(
  notification.selectors,
  user.selectors,
  dashboard.selectors,
  reduxLib.mapSelectors(entityForEdit.selectors, entityForEdit.module),
  reduxLib.mapSelectors(entity.selectors, entity.module),
  reduxLib.mapSelectors(search.selectors, search.module),
  reduxLib.mapSelectors(serverConstant.selectors, serverConstant.module),
  reduxLib.mapSelectors(tag.selectors, tag.module)
)
