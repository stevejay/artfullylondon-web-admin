import { handleActions } from 'redux-actions'
import { calculateBrowserWidthType } from '_src/lib/browser'
import * as types from '_src/constants/browser'

const initialState = {
  widthType: calculateBrowserWidthType(window.innerWidth)
}

export default handleActions(
  {
    [types.BROWSER_WIDTH_CHANGED]: (state, action) => ({
      ...state,
      widthType: calculateBrowserWidthType(action.payload.width)
    })
  },
  initialState
)
