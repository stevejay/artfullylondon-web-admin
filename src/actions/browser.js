import { createAction } from 'redux-actions'
import * as types from '_src/constants/browser'

export const browserWidthChanged = createAction(types.BROWSER_WIDTH_CHANGED)
