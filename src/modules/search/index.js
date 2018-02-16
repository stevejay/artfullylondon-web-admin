import { moduleName, reducer, selectors } from './reducers'
import sagas from './sagas'
import * as actions from './actions'
import Quicksearch from './components/quicksearch'
import ResultsPage from './pages/results'

export {
  Quicksearch,
  ResultsPage,
  moduleName,
  reducer,
  selectors,
  sagas,
  actions
}
