import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import * as reduxLib from '_src/lib/redux'
import * as entityForEdit from './entity-for-edit'
import * as entity from './entity'
import * as notification from '_src/modules/notification'
import * as user from '_src/modules/user'
import * as search from './search'
import * as serverConstant from './server-constant'
import * as status from './status'
import * as tag from './tag'

export const reducer = combineReducers({
  form: formReducer,
  [entityForEdit.module]: entityForEdit.reducer,
  [entity.module]: entity.reducer,
  [notification.moduleName]: notification.reducer,
  [user.moduleName]: user.reducer,
  [search.module]: search.reducer,
  [serverConstant.module]: serverConstant.reducer,
  [status.module]: status.reducer,
  [tag.module]: tag.reducer
})

export const selectors = reduxLib.combineSelectors(
  reduxLib.mapSelectors(entityForEdit.selectors, entityForEdit.module),
  reduxLib.mapSelectors(entity.selectors, entity.module),
  notification.selectors,
  user.selectors,
  reduxLib.mapSelectors(search.selectors, search.module),
  reduxLib.mapSelectors(serverConstant.selectors, serverConstant.module),
  reduxLib.mapSelectors(status.selectors, status.module),
  reduxLib.mapSelectors(tag.selectors, tag.module)
)
