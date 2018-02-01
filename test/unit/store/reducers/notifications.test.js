import deepFreeze from 'deep-freeze'

import notificationsReducer from '_src/store/reducers/notifications'
import * as notificationActions from '_src/store/actions/notification'

it('should have the correct initial state', () => {
  const actual = notificationsReducer(undefined, {})
  expect(actual).toEqual({ items: [] })
})

it('should handle adding a notification', () => {
  const state = deepFreeze({
    items: [{ id: 'a' }]
  })

  const actual = notificationsReducer(
    state,
    notificationActions.notificationAdded({ id: 'b' })
  )

  expect(actual).toEqual({ items: [{ id: 'b' }, { id: 'a' }] })
})

it('should handle removing a notification that exists', () => {
  const state = deepFreeze({
    items: [{ id: 'a' }]
  })

  const actual = notificationsReducer(
    state,
    notificationActions.removeNotification('a')
  )

  expect(actual).toEqual({ items: [] })
})

it('should handle removing a notification that does not exist', () => {
  const state = deepFreeze({
    items: [{ id: 'a' }]
  })

  const actual = notificationsReducer(
    state,
    notificationActions.removeNotification('b')
  )

  expect(actual).toEqual(state)
})
