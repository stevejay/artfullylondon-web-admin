import { handleActions } from 'redux-actions'

import { types } from '_src/modules/reference-data/actions'
import * as referenceDataLib
  from '_src/modules/reference-data/lib/reference-data'
import referenceData from './reference-data.json'

const initialState = {
  loading: true,
  ...referenceDataLib.mapReferenceData(referenceData)
}

export const reducer = handleActions(
  {
    [types.FETCH_REFERENCE_DATA_SUCCEEDED]: (state, action) => ({
      ...state,
      loading: false,
      ...referenceDataLib.mapReferenceData(action.payload)
    })
  },
  initialState
)

export const selectors = {}