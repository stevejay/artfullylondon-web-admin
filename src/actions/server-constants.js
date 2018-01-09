import { createAction } from 'redux-actions'
import * as types from '_src/constants/server-constants'

export const fetchServerConstants = createAction(types.FETCH_SERVER_CONSTANTS)
