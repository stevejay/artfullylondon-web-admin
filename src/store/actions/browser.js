export const types = {
  BROWSER_WIDTH_CHANGED: 'browser/BROWSER_WIDTH_CHANGED',
  UPDATE_BROWSER_WIDTH_TYPE: 'browser/UPDATE_BROWSER_WIDTH_TYPE'
}

export const browserWidthChanged = width => ({
  type: types.BROWSER_WIDTH_CHANGED,
  payload: { width }
})

export const updateBrowserWidthType = widthType => ({
  type: types.UPDATE_BROWSER_WIDTH_TYPE,
  payload: { widthType }
})
