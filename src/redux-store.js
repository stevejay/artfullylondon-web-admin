import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { middleware as thunkMiddleware } from 'redux-saga-thunk'
import { reducer as formReducer } from 'redux-form'

import * as devTools from '_src/debug/dev-tools'
import * as reduxLib from '_src/lib/redux'
import * as entity from '_src/modules/entity'
import * as notification from '_src/modules/notification'
import * as dashboard from '_src/modules/dashboard'
import * as tag from '_src/modules/tag'
import * as user from '_src/modules/user'
import * as search from '_src/modules/search'
import * as reference from '_src/modules/reference'

const reducer = combineReducers({
  form: formReducer,
  [notification.moduleName]: notification.reducer,
  [dashboard.moduleName]: dashboard.reducer,
  [user.moduleName]: user.reducer,
  [tag.moduleName]: tag.reducer,
  [search.moduleName]: search.reducer,
  [entity.moduleName]: entity.reducer,
  [reference.moduleName]: reference.reducer
})

const sagas = function * () {
  yield all([
    ...appUpdater.sagas,
    ...reference.sagas,
    ...notification.sagas,
    ...search.sagas,
    ...tag.sagas,
    ...entity.sagas,
    ...image.sagas,
    ...link.sagas,
    ...user.sagas,
    ...dashboard.sagas
  ])
  // ...monitorsSagas,
  // ...timeSagas,
}

const sagaMiddleware = createSagaMiddleware()

const middlewareApplier = devTools.devToolsApplier(
  applyMiddleware(thunkMiddleware, sagaMiddleware)
)

function configure (initialState) {
  const store = middlewareApplier(createStore)(reducer, initialState)
  sagaMiddleware.run(sagas)
  return store
}

export default configure()
