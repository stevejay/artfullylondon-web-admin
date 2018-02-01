export const types = {
  APP_SHOULD_UPDATE: 'app/APP_SHOULD_UPDATE',
  UPDATE_APP: 'app/UPDATE_APP',
  CHECK_IF_APP_WAS_UPDATED: 'app/CHECK_IF_APP_WAS_UPDATED'
}

export const appShouldUpdate = () => ({
  type: types.APP_SHOULD_UPDATE
})

export const updateApp = () => ({
  type: types.UPDATE_APP
})

export const checkIfAppWasUpdated = () => ({
  type: types.CHECK_IF_APP_WAS_UPDATED
})

export const returnPromise = meta => ({
  type: 'app/RETURN_THUNK',
  meta
})
