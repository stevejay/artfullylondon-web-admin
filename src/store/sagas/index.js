import { all } from 'redux-saga/effects'
import authSagas from './auth'
import browserSagas from './browser'
import serverConstantsSagas from './server-constants'
// import entitySagas from './entity';
// import imageSagas from './image';
// import linkSagas from './link';
// import monitorsSagas from './monitors';
import searchSagas from './search'
// import tagSagas from './tag';
// import timeSagas from './time';
import statusSagas from './status'
import notificationsSagas from './notifications'

export default function * () {
  yield all([
    ...authSagas,
    ...serverConstantsSagas,
    ...browserSagas,
    ...notificationsSagas,
    ...statusSagas,
    ...searchSagas
  ])
  //
  // ...entitySagas,
  // ...imageSagas,
  // ...linkSagas,
  // ...monitorsSagas,
  // ...tagSagas,
  // ...timeSagas,
}
