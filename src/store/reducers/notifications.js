import { handleActions } from 'redux-actions'
import * as notificationActionTypes from '_src/constants/action/notification'

const initialState = {
  items: []
}

export default handleActions(
  {
    [notificationActionTypes.NOTIFICATION_ADDED]: (state, action) => ({
      ...state,
      items: [action.payload, ...state.items]
    }),
    [notificationActionTypes.REMOVE_NOTIFICATION]: (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      }
    }
  },
  initialState
)
