import { handleActions } from 'redux-actions'

import { types } from '_src/modules/reference/actions'
import * as referenceLib from '_src/modules/reference/lib/reference'
import referenceData from './reference-data.json'

const initialState = {
  loading: true,
  ...referenceLib.mapReferenceData(referenceData)
}

export const reducer = handleActions(
  {
    [types.FETCH_REFERENCE_DATA_SUCCEEDED]: (state, action) => ({
      ...state,
      loading: false,
      ...referenceLib.mapReferenceData(action.payload)
    })
  },
  initialState
)

export const selectors = {}
