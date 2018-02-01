import deepFreeze from 'deep-freeze'

import notificationReducer from '_src/store/reducers/notification'
import * as notificationActions from '_src/store/actions/notification'

it('should have the correct initial state', () => {
  const actual = notificationReducer(undefined, {})
  expect(actual).toEqual({ items: [] })
})

it('should handle adding a notification', () => {
  const state = deepFreeze({
    items: [{ id: 'a' }]
  })

  const actual = notificationReducer(
    state,
    notificationActions.notificationAdded({ id: 'b' })
  )

  expect(actual).toEqual({ items: [{ id: 'b' }, { id: 'a' }] })
})

it('should handle removing a notification that exists', () => {
  const state = deepFreeze({
    items: [{ id: 'a' }]
  })

  const actual = notificationReducer(
    state,
    notificationActions.removeNotification('a')
  )

  expect(actual).toEqual({ items: [] })
})

it('should handle removing a notification that does not exist', () => {
  const state = deepFreeze({
    items: [{ id: 'a' }]
  })

  const actual = notificationReducer(
    state,
    notificationActions.removeNotification('b')
  )

  expect(actual).toEqual(state)
})
