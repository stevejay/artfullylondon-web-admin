import deepFreeze from 'deep-freeze'

import {
  reducer,
  selectors
} from '_src/modules/notification/reducers/notification'
import * as notificationActions from '_src/modules/notification/actions'

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

describe('notifications selector', () => {
  it('should return the correct state', () => {
    const state = { items: [{ id: 'a' }] }
    const actual = selectors.notifications(state)
    expect(actual).toEqual([{ id: 'a' }])
  })
})
