import { handleActions } from 'redux-actions'

import * as browserConstants from '_src/constants/browser'
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

// parameters: (state)
export const selectors = {
  isWideBrowser: state =>
    state.browser.widthType === browserConstants.BROWSER_WIDTH_TYPE_WIDE
}
