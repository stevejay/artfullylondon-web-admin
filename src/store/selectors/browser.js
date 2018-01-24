import { createSelector } from 'reselect'

import * as browserConstants from '_src/constants/browser'

// parameters: (state)
export const isWideBrowser = createSelector(
  state => state.browser.widthType,
  widthType => widthType === browserConstants.BROWSER_WIDTH_TYPE_WIDE
)
