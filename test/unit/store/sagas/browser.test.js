import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'

import * as browserConstants from '_src/constants/browser'
import * as browserActionTypes from '_src/constants/action/browser'
import * as browserSagas from '_src/store/sagas/browser'

describe('browserWidthChanged', () => {
  const generator = browserSagas.browserWidthChanged({
    type: browserActionTypes.BROWSER_WIDTH_CHANGED,
    payload: { width: 1200 }
  })

  it('should debounce the saga', () => {
    expect(generator.next().value).toEqual(call(delay, 250))
  })

  it('should invoke the update browser width type action', () => {
    expect(generator.next().value).toEqual(
      put.resolve({
        type: browserActionTypes.UPDATE_BROWSER_WIDTH_TYPE,
        payload: { widthType: browserConstants.BROWSER_WIDTH_TYPE_WIDE }
      })
    )
  })

  it('should be done', () => {
    expect(generator.next().done).toEqual(true)
  })
})
