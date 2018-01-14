import { delay } from 'redux-saga'
import { takeLatest, put, call } from 'redux-saga/effects'

import * as browserActionTypes from '_src/constants/actions/browser'
import * as browserLib from '_src/lib/browser'

const BROWSER_WIDTH_CHANGED_DEBOUNCE_MS = 250

export function * browserWidthChanged (action) {
  yield call(delay, BROWSER_WIDTH_CHANGED_DEBOUNCE_MS)

  const { width } = action.payload
  const widthType = browserLib.calculateBrowserWidthType(width)

  yield put.resolve({
    type: browserActionTypes.UPDATE_BROWSER_WIDTH_TYPE,
    payload: { widthType }
  })
}

export default [
  takeLatest(browserActionTypes.BROWSER_WIDTH_CHANGED, browserWidthChanged)
]
