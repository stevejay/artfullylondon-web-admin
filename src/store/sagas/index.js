import { all } from 'redux-saga/effects'

import { sagas as appUpdaterSagas } from '_src/modules/app-updater'
import { sagas as notificationSagas } from '_src/modules/notification'
import authSagas from './auth'
import browserSagas from './browser'
import serverConstantSagas from './server-constant'
import entitySagas from './entity'
import imageSagas from './image'
import linkSagas from './link'
// import monitorsSagas from './monitors';
import searchSagas from './search'
import tagSagas from './tag'
// import timeSagas from './time';
import statusSagas from './status'

export const sagas = function * () {
  yield all([
    ...appUpdaterSagas,
    ...authSagas,
    ...serverConstantSagas,
    ...browserSagas,
    ...notificationSagas,
    ...statusSagas,
    ...searchSagas,
    ...tagSagas,
    ...entitySagas,
    ...imageSagas,
    ...linkSagas
  ])
  // ...monitorsSagas,
  // ...timeSagas,
}
