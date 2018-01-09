import { createAction } from 'redux-actions'
import * as types from '_src/constants/auth'

export const resetLogIn = createAction(types.LOGGED_OUT)
export const submitLogIn = createAction(types.SUBMIT_LOGIN)
export const logOut = createAction(types.LOG_OUT)
export const logInSucceeded = createAction(types.LOG_IN_SUCCEEDED)
