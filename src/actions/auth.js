import { createAction } from 'redux-actions'
import * as authActionsTypes from '_src/constants/actions/auth'

export const resetLogIn = createAction(authActionsTypes.LOGGED_OUT)
export const logIn = createAction(authActionsTypes.LOG_IN)
export const logOut = createAction(authActionsTypes.LOG_OUT)
export const logInSucceeded = createAction(authActionsTypes.LOG_IN_SUCCEEDED)
