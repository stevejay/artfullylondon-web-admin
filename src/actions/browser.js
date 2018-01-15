import { createAction } from 'redux-actions'
import * as browserActionTypes from '_src/constants/action/browser'

export const browserWidthChanged = createAction(
  browserActionTypes.BROWSER_WIDTH_CHANGED
)
