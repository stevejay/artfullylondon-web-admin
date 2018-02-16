import { handleActions } from 'redux-actions'
import _ from 'lodash'

import { types } from '../actions'

const initialState = {
  entityCounts: {},
  getEntityCountsInProgress: false,
  getEntityCountsFailed: false
}

export const reducer = handleActions(
  {
    [types.GET_ENTITY_COUNTS_STARTED]: state => ({
      ...state,
      getEntityCountsInProgress: true,
      getEntityCountsFailed: false
    }),
    [types.GET_ENTITY_COUNTS_SUCCEEDED]: (state, action) => ({
      ...state,
      getEntityCountsInProgress: false,
      getEntityCountsFailed: false,
      entityCounts: _.keyBy(action.payload.items, item => item.entityType)
    }),
    [types.GET_ENTITY_COUNTS_FAILED]: state => ({
      ...state,
      getEntityCountsInProgress: false,
      getEntityCountsFailed: true
    })
  },
  initialState
)

export const selectors = {
  entityCounts: state => state.entityCounts,
  gettingEntityCounts: state => state.getEntityCountsInProgress,
  failedToGetEntityCounts: state => state.getEntityCountsFailed
}
