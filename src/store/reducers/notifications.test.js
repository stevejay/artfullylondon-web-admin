import deepFreeze from 'deep-freeze'

import { reducer } from '_src/store/reducers/notification'
import { notificationActions } from '_src/store'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})
  expect(actual).toEqual({ items: [] })
})

it('should handle adding a notification', () => {
  const state = deepFreeze({
    items: [{ id: 'a' }]
  })

  const actual = reducer(
    state,
    notificationActions.notificationAdded({ id: 'b' })
  )

  expect(actual).toEqual({ items: [{ id: 'b' }, { id: 'a' }] })
})

it('should handle removing a notification that exists', () => {
  const state = deepFreeze({
    items: [{ id: 'a' }]
  })

  const actual = reducer(state, notificationActions.removeNotification('a'))

  expect(actual).toEqual({ items: [] })
})

it('should handle removing a notification that does not exist', () => {
  const state = deepFreeze({
    items: [{ id: 'a' }]
  })

  const actual = reducer(state, notificationActions.removeNotification('b'))

  expect(actual).toEqual(state)
})
