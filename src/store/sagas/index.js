import { all } from 'redux-saga/effects'
import appSagas from './app'
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
import notificationSagas from './notification'

export default function * () {
  yield all([
    ...appSagas,
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
  // ...tagSagas,
  // ...timeSagas,
}
