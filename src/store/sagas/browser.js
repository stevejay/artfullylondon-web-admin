import { delay } from 'redux-saga'
import { takeLatest, put, call } from 'redux-saga/effects'

import * as browserActionTypes from '_src/constants/action/browser'
import * as browserConstants from '_src/constants/browser'
import * as browserLib from '_src/lib/browser'

export function * browserWidthChanged (action) {
  yield call(delay, browserConstants.BROWSER_WIDTH_CHANGED_DEBOUNCE_MS)

  const widthType = yield call(
    browserLib.calculateBrowserWidthType,
    action.payload.width
  )

  yield put({
    type: browserActionTypes.UPDATE_BROWSER_WIDTH_TYPE,
    payload: { widthType }
  })
}

export default [
  takeLatest(browserActionTypes.BROWSER_WIDTH_CHANGED, browserWidthChanged)
]
