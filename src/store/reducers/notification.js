import { handleActions } from 'redux-actions'

import { types } from '_src/store/actions/notification'

const initialState = {
  items: []
}

export default handleActions(
  {
    [types.NOTIFICATION_ADDED]: (state, action) => ({
      ...state,
      items: [action.payload, ...state.items]
    }),
    [types.REMOVE_NOTIFICATION]: (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      }
    }
  },
  initialState
)
