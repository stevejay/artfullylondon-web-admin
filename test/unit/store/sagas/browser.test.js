import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'

import * as browserConstants from '_src/constants/browser'
import * as browserActionTypes from '_src/constants/action/browser'
import * as browserSagas from '_src/store/sagas/browser'
import * as browserLib from '_src/lib/browser'

describe('browserWidthChanged', () => {
  it('should handle a browser width changed message', () => {
    const generator = browserSagas.browserWidthChanged({
      type: browserActionTypes.BROWSER_WIDTH_CHANGED,
      payload: { width: 1200 }
    })

    let result = generator.next()

    expect(result.value).toEqual(
      call(delay, browserConstants.BROWSER_WIDTH_CHANGED_DEBOUNCE_MS)
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(browserLib.calculateBrowserWidthType, 1200)
    )

    result = generator.next(browserConstants.BROWSER_WIDTH_TYPE_NARROW)

    expect(result.value).toEqual(
      put({
        type: browserActionTypes.UPDATE_BROWSER_WIDTH_TYPE,
        payload: { widthType: browserConstants.BROWSER_WIDTH_TYPE_NARROW }
      })
    )

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})
