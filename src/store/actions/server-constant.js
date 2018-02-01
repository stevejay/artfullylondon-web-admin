export const types = {
  FETCH_SERVER_CONSTANTS: 'serverConstant/FETCH_SERVER_CONSTANTS',
  FETCH_SERVER_CONSTANTS_SUCCEEDED: 'serverConstant/FETCH_SERVER_CONSTANTS_SUCCEEDED'
}

export const fetchServerConstants = () => ({
  type: types.FETCH_SERVER_CONSTANTS
})

export const fetchServerConstantsSucceeded = payload => ({
  type: types.FETCH_SERVER_CONSTANTS_SUCCEEDED,
  payload
})
