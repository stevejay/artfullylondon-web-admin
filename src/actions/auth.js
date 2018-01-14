import { createAction } from 'redux-actions'
import * as authActionsTypes from '_src/constants/actions/auth'

export const resetLogIn = createAction(authActionsTypes.LOGGED_OUT)
export const submitLogIn = createAction(authActionsTypes.SUBMIT_LOGIN)
export const logOut = createAction(authActionsTypes.LOG_OUT)
export const logInSucceeded = createAction(authActionsTypes.LOG_IN_SUCCEEDED)
