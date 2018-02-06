import EntityDetailPage from '_src/modules/entity/pages/detail'
import EntityEditOrCreatePage from '_src/modules/entity/pages/edit-or-create'
import { moduleName, reducer, selectors } from '_src/modules/entity/reducers'
import sagas from '_src/modules/entity/sagas'
import * as actions from '_src/modules/entity/actions'

export {
  EntityDetailPage,
  EntityEditOrCreatePage,
  moduleName,
  reducer,
  selectors,
  sagas,
  actions
}
