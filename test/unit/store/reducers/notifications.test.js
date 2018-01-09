import deepFreeze from 'deep-freeze'

import * as types from '_src/constants/notifications'
import notificationsReducer from '_src/store/reducers/notifications'

it('should have the correct initial state', () => {
  const actual = notificationsReducer(undefined, {})
  expect(actual).toEqual({ items: [] })
})

it('should handle adding a notification', () => {
  const state = deepFreeze({
    items: [{ id: 'a' }]
  })

  const actual = notificationsReducer(state, {
    type: types.NOTIFICATION_ADDED,
    payload: { id: 'b' }
  })

  expect(actual).toEqual({ items: [{ id: 'b' }, { id: 'a' }] })
})

it('should handle removing a notification that exists', () => {
  const state = deepFreeze({
    items: [{ id: 'a' }]
  })

  const actual = notificationsReducer(state, {
    type: types.REMOVE_NOTIFICATION,
    payload: { id: 'a' }
  })

  expect(actual).toEqual({ items: [] })
})

it('should handle removing a notification that does not exist', () => {
  const state = deepFreeze({
    items: [{ id: 'a' }]
  })

  const actual = notificationsReducer(state, {
    type: types.REMOVE_NOTIFICATION,
    payload: { id: 'b' }
  })

  expect(actual).toEqual(state)
})
