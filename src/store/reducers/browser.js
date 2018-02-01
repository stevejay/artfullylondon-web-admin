import { handleActions } from 'redux-actions'

import * as browserLib from '_src/lib/browser'
import { types } from '_src/store/actions/browser'

const initialState = {
  widthType: browserLib.calculateBrowserWidthType(
    browserLib.getWindowInnerWidth()
  )
}

export default handleActions(
  {
    [types.UPDATE_BROWSER_WIDTH_TYPE]: (state, action) => {
      const { widthType } = action.payload
      return widthType === state.widthType ? state : { ...state, widthType }
    }
  },
  initialState
)
