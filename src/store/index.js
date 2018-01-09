import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import * as devTools from '_src/debug/dev-tools'
import reducers from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const middlewareApplier = devTools.devToolsApplier(
  applyMiddleware(sagaMiddleware)
)

function configure (initialState) {
  const store = middlewareApplier(createStore)(reducers, initialState)
  sagaMiddleware.run(sagas)
  return store
}

export default configure()
