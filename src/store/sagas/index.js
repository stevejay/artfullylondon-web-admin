import { all } from 'redux-saga/effects'

import { sagas as appUpdaterSagas } from '_src/modules/app-updater'
import { sagas as notificationSagas } from '_src/modules/notification'
import { sagas as userSagas } from '_src/modules/user'
import { sagas as dashboardSagas } from '_src/modules/dashboard'
import { sagas as tagSagas } from '_src/modules/tag'
import { sagas as searchSagas } from '_src/modules/search'
import serverConstantSagas from './server-constant'
import entitySagas from './entity'
import imageSagas from './image'
import linkSagas from './link'
// import monitorsSagas from './monitors';
// import timeSagas from './time';

export const sagas = function * () {
  yield all([
    ...appUpdaterSagas,
    ...serverConstantSagas,
    ...notificationSagas,
    ...searchSagas,
    ...tagSagas,
    ...entitySagas,
    ...imageSagas,
    ...linkSagas,
    ...userSagas,
    ...dashboardSagas
  ])
  // ...monitorsSagas,
  // ...timeSagas,
}
