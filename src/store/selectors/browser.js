import * as browserConstants from '_src/constants/browser'

export function isWideBrowser (state) {
  return state.browser.widthType === browserConstants.BROWSER_WIDTH_TYPE_WIDE
}
