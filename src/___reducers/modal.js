import { handleActions } from 'redux-actions'
import * as types from '_src/constants/modal'

const initialState = {
  showSidenav: false,
  showQuicksearch: false,
  showModal: false,
  modalProps: null,
  component: null,
  componentProps: null
}

export default handleActions({
  [types.SHOW_SIDENAV]: state => ({
    ...state,
    showSidenav: true
  }),
  [types.HIDE_SIDENAV]: state => ({
    ...state,
    showSidenav: false
  }),
  [types.SHOW_QUICKSEARCH]: state => ({
    ...state,
    showQuicksearch: true
  }),
  [types.HIDE_QUICKSEARCH]: state => ({
    ...state,
    showQuicksearch: false
  }),
  [types.SHOW_MODAL]: (state, action) => ({
    ...state,
    showModal: true,
    modalProps: action.payload.modalProps,
    component: action.payload.component,
    componentProps: action.payload.componentProps
  }),
  [types.HIDE_MODAL]: state => ({
    ...state,
    showModal: false,
    modalProps: null,
    component: null,
    componentProps: null
  })
}, initialState)
