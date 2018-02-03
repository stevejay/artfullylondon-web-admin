import { handleActions } from 'redux-actions'

import { FullEvent } from '_src/entities/event'
import { FullEventSeries } from '_src/entities/event-series'
import { FullTalent } from '_src/entities/talent'
import { FullVenue } from '_src/entities/venue'
import * as entityConstants from '_src/constants/entity'
import { types } from '_src/store/actions/entity'

export const module = 'entity'

const initialState = {
  entityId: null,
  entity: null,
  getInProgress: false,
  getFailed: false
  // selectedTalentId: null,
  // eventMonitors: [],
  // getEventMonitorsInProgress: false
}

export const reducer = handleActions(
  {
    [types.GET_ENTITY_STARTED]: (state, action) => ({
      ...state,
      entityId: action.payload.id,
      getInProgress: true,
      getFailed: false
      // eventMonitors: [],
      // getEventMonitorsInProgress: false
    }),
    [types.GET_ENTITY_SUCCEEDED]: (state, action) => ({
      ...state,
      getInProgress: false,
      getFailed: false,
      entity: createEntity(action.payload.entity)
    }),
    [types.GET_ENTITY_FAILED]: (state, action) => ({
      ...initialState,
      getFailed: true
    })
    // [types.TALENT_SELECTED]: (state, action) => {
    //   if (entityType !== entityConstants.ENTITY_TYPE_EVENT) {
    //     return state
    //   }

    //   return {
    //     ...state,
    //     selectedTalentId: action.payload.talentId
    //   }
    // }
  },
  initialState
)

export const selectors = {
  entity: state => state.entity,
  entityId: state => state.entityId,
  gettingEntity: state => state.getInProgress,
  failedToGetEntity: state => state.getFailed
}

function createEntity (entity) {
  switch (entity.entityType) {
    case entityConstants.ENTITY_TYPE_EVENT:
      return new FullEvent(entity)
    case entityConstants.ENTITY_TYPE_EVENT_SERIES:
      return new FullEventSeries(entity)
    case entityConstants.ENTITY_TYPE_TALENT:
      return new FullTalent(entity)
    case entityConstants.ENTITY_TYPE_VENUE:
      return new FullVenue(entity)
    default:
      throw new Error(`entityType ${entity.entityType} not supported`)
  }
}
