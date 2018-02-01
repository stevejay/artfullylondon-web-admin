import { delay } from 'redux-saga'
import { takeLatest, put, call } from 'redux-saga/effects'

import * as browserActions from '_src/store/actions/browser'
import * as browserConstants from '_src/constants/browser'
import * as browserLib from '_src/lib/browser'

export function * browserWidthChanged (action) {
  yield call(delay, browserConstants.BROWSER_WIDTH_CHANGED_DEBOUNCE_MS)

  const widthType = yield call(
    browserLib.calculateBrowserWidthType,
    action.payload.width
  )

  yield put(browserActions.updateBrowserWidthType(widthType))
}

export default [
  takeLatest(browserActions.types.BROWSER_WIDTH_CHANGED, browserWidthChanged)
]
