export const types = {
  FETCH_SERVER_CONSTANTS: 'data/FETCH_SERVER_CONSTANTS',
  FETCH_SERVER_CONSTANTS_SUCCEEDED: 'data/FETCH_SERVER_CONSTANTS_SUCCEEDED'
}

export const fetchServerConstants = () => ({
  type: types.FETCH_SERVER_CONSTANTS
})

export const fetchServerConstantsSucceeded = payload => ({
  type: types.FETCH_SERVER_CONSTANTS_SUCCEEDED,
  payload
})
