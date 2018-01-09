import { delay } from 'redux-saga'
import { takeLatest, put, call } from 'redux-saga/effects'
import * as types from '_src/constants/browser'
import * as browserLib from '_src/lib/browser'

const BROWSER_WIDTH_CHANGED_DEBOUNCE_MS = 250

export function * browserWidthChanged (action) {
  yield call(delay, BROWSER_WIDTH_CHANGED_DEBOUNCE_MS)

  const { width } = action.payload
  const widthType = browserLib.calculateBrowserWidthType(width)

  yield put.resolve({
    type: types.UPDATE_BROWSER_WIDTH_TYPE,
    payload: { widthType }
  })
}

export default [takeLatest(types.BROWSER_WIDTH_CHANGED, browserWidthChanged)]
