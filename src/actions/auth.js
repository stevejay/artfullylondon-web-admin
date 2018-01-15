import { createAction } from 'redux-actions'
import * as authActionTypes from '_src/constants/action/auth'

export const resetLogIn = createAction(authActionTypes.LOGGED_OUT)
export const logIn = createAction(authActionTypes.LOG_IN)
export const logOut = createAction(authActionTypes.LOG_OUT)
export const logInSucceeded = createAction(authActionTypes.LOG_IN_SUCCEEDED)
