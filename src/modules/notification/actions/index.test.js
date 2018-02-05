import * as notificationActions from '_src/modules/notification/actions'
import * as notificationConstants from '_src/modules/notification/constants'

describe('addSuccessNotification', () => {
  it('should create a success notification action', () => {
    const actual = notificationActions.addSuccessNotification(
      'Title',
      'Message'
    )

    expect(actual).toEqual({
      type: notificationActions.types.ADD_NOTIFICATION,
      payload: {
        type: notificationConstants.NOTIFICATION_TYPE_SUCCESS,
        title: 'Title',
        message: 'Message'
      }
    })
  })
})

describe('addErrorNotification', () => {
  it('should create an error notification action', () => {
    const actual = notificationActions.addErrorNotification('Title', 'Message')

    expect(actual).toEqual({
      type: notificationActions.types.ADD_NOTIFICATION,
      payload: {
        type: notificationConstants.NOTIFICATION_TYPE_ERROR,
        title: 'Title',
        message: 'Message'
      }
    })
  })
})
