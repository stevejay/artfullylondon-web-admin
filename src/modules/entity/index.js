import EntityPage from '_src/modules/entity/pages/entity'
import { moduleName, reducer, selectors } from '_src/modules/entity/reducers'
import sagas from '_src/modules/entity/sagas'
import * as actions from '_src/modules/entity/actions'
import * as entityMapper from '_src/modules/entity/lib/mapper'

export {
  EntityPage,
  entityMapper,
  moduleName,
  reducer,
  selectors,
  sagas,
  actions
}
