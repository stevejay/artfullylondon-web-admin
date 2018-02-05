export const types = {
  CHECK_FOR_NEW_APP_VERSION: 'app-updater/CHECK_FOR_NEW_APP_VERSION',
  UPDATE_APP: 'app-updater/UPDATE_APP',
  CHECK_IF_APP_WAS_UPDATED: 'app-updater/CHECK_IF_APP_WAS_UPDATED'
}

export const checkForNewAppVersion = () => ({
  type: types.CHECK_FOR_NEW_APP_VERSION,
  meta: { thunk: true }
})

export const updateApp = () => ({
  type: types.UPDATE_APP
})

export const checkIfAppWasUpdated = () => ({
  type: types.CHECK_IF_APP_WAS_UPDATED
})
