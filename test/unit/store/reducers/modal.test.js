import deepFreeze from 'deep-freeze'

import * as types from '_src/constants/modal'
import modalReducer from '_src/store/reducers/modal'

it('should have the correct initial state', () => {
  const actual = modalReducer(undefined, {})

  expect(actual).toEqual({
    showSidenav: false,
    showQuicksearch: false,
    showModal: false,
    modalProps: null,
    component: null,
    componentProps: null
  })
})

it('should handle a show sidenav message', () => {
  const state = deepFreeze({
    showSidenav: false,
    showQuicksearch: false,
    showModal: false,
    modalProps: null,
    component: null,
    componentProps: null
  })

  const actual = modalReducer(state, {
    type: types.SHOW_SIDENAV
  })

  expect(actual).toEqual({
    showSidenav: true,
    showQuicksearch: false,
    showModal: false,
    modalProps: null,
    component: null,
    componentProps: null
  })
})

it('should handle a hide sidenav message', () => {
  const state = deepFreeze({
    showSidenav: true,
    showQuicksearch: false,
    showModal: false,
    modalProps: null,
    component: null,
    componentProps: null
  })

  const actual = modalReducer(state, {
    type: types.HIDE_SIDENAV
  })

  expect(actual).toEqual({
    showSidenav: false,
    showQuicksearch: false,
    showModal: false,
    modalProps: null,
    component: null,
    componentProps: null
  })
})

it('should handle a show quicksearch message', () => {
  const state = deepFreeze({
    showSidenav: false,
    showQuicksearch: false,
    showModal: false,
    modalProps: null,
    component: null,
    componentProps: null
  })

  const actual = modalReducer(state, {
    type: types.SHOW_QUICKSEARCH
  })

  expect(actual).toEqual({
    showSidenav: false,
    showQuicksearch: true,
    showModal: false,
    modalProps: null,
    component: null,
    componentProps: null
  })
})

it('should handle a hide quicksearch message', () => {
  const state = deepFreeze({
    showSidenav: false,
    showQuicksearch: true,
    showModal: false,
    modalProps: null,
    component: null,
    componentProps: null
  })

  const actual = modalReducer(state, {
    type: types.HIDE_QUICKSEARCH
  })

  expect(actual).toEqual({
    showSidenav: false,
    showQuicksearch: false,
    showModal: false,
    modalProps: null,
    component: null,
    componentProps: null
  })
})
