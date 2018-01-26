import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { middleware as thunkMiddleware } from 'redux-saga-thunk'

import * as devTools from '_src/debug/dev-tools'
import reducers from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const middlewareApplier = devTools.devToolsApplier(
  applyMiddleware(thunkMiddleware, sagaMiddleware)
)

function configure (initialState) {
  const store = middlewareApplier(createStore)(reducers, initialState)
  sagaMiddleware.run(sagas)
  return store
}

export default configure()
