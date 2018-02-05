import NotificationContainer
  from '_src/modules/notification/components/notification-container'

import {
  moduleName,
  reducer,
  selectors
} from '_src/modules/notification/reducers'

import sagas from '_src/modules/notification/sagas'
import * as actions from '_src/modules/notification/actions'

export { NotificationContainer, moduleName, reducer, selectors, sagas, actions }
