import { moduleName, reducer, selectors } from '_src/modules/search/reducers'
import sagas from '_src/modules/search/sagas'
import * as actions from '_src/modules/search/actions'
import Quicksearch from '_src/modules/search/components/quicksearch'
import ResultsPage from '_src/modules/search/pages/results'

export {
  Quicksearch,
  ResultsPage,
  moduleName,
  reducer,
  selectors,
  sagas,
  actions
}
