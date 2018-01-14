import { createAction } from 'redux-actions'
import * as browserActionTypes from '_src/constants/actions/browser'

export const browserWidthChanged = createAction(
  browserActionTypes.BROWSER_WIDTH_CHANGED
)
