import { createAction } from 'redux-actions'
import * as types from '_src/constants/modal'

export const showSidenav = createAction(types.SHOW_SIDENAV)
export const hideSidenav = createAction(types.HIDE_SIDENAV)

export const showQuicksearch = createAction(types.SHOW_QUICKSEARCH)
export const hideQuicksearch = createAction(types.HIDE_QUICKSEARCH)

export const showModal = createAction(types.SHOW_MODAL)
export const hideModal = createAction(types.HIDE_MODAL)
