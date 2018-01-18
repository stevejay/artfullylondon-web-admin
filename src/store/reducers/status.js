import { handleActions } from 'redux-actions'

import * as entityLib from '_src/lib/entity'
import * as statusActionTypes from '_src/constants/action/status'

const initialState = {
  entityCounts: [],
  getEntityCountsInProgress: false,
  getEntityCountsFailed: false
}

export default handleActions(
  {
    [statusActionTypes.GET_ENTITY_COUNTS_STARTED]: state => ({
      ...state,
      getEntityCountsInProgress: true,
      getEntityCountsFailed: false
    }),
    [statusActionTypes.GET_ENTITY_COUNTS_SUCCEEDED]: (state, action) => {
      const entityCounts = action.payload.items.map(item => {
        item.label = entityLib.getLabelForEntityType(item.entityType)
        item.value = item.count
        return item
      })

      return {
        ...state,
        getEntityCountsInProgress: false,
        getEntityCountsFailed: false,
        entityCounts
      }
    },
    [statusActionTypes.GET_ENTITY_COUNTS_FAILED]: state => ({
      ...state,
      getEntityCountsInProgress: false,
      getEntityCountsFailed: true
    })
  },
  initialState
)
