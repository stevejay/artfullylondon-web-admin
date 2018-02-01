import { handleActions } from 'redux-actions'

import { FullEvent } from '_src/entities/event'
import { FullEventSeries } from '_src/entities/event-series'
import { FullTalent } from '_src/entities/talent'
import { FullVenue } from '_src/entities/venue'
import * as entityConstants from '_src/constants/entity'
import { types } from '_src/store/actions/entity'

const initialState = {
  entityId: null,
  entity: null,
  getInProgress: false,
  getFailed: false
  // getFailedStatusCode: null,
  // selectedTalentId: null,
  // eventMonitors: [],
  // getEventMonitorsInProgress: false
}

// TODO proper reducer filtering on entityType.

export default function (entityType) {
  return handleActions(
    {
      [types.GET_ENTITY_STARTED]: (state, action) => {
        if (action.payload.entityType !== entityType) {
          return state
        }

        return {
          ...state,
          entityId: action.payload.id,
          getInProgress: true,
          getFailed: false
          // getFailedStatusCode: null,
          // eventMonitors: [],
          // getEventMonitorsInProgress: false
        }
      },
      [types.GET_ENTITY_SUCCEEDED]: (state, action) => {
        if (action.payload.entityType !== entityType) {
          return state
        }

        if (action.payload.entity.id !== state.entityId) {
          return state
        }

        return {
          ...state,
          getInProgress: false,
          getFailed: false,
          // getFailedStatusCode: null,
          entity: createEntity(entityType, action.payload.entity)
        }
      },
      [types.GET_ENTITY_FAILED]: (state, action) => {
        if (action.payload.entityType !== entityType) {
          return state
        }

        return {
          ...initialState,
          getFailed: true
          // getFailedStatusCode: action.payload.statusCode
        }
      }
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
}

function createEntity (entityType, entity) {
  switch (entityType) {
    case entityConstants.ENTITY_TYPE_EVENT:
      return new FullEvent(entity)
    case entityConstants.ENTITY_TYPE_EVENT_SERIES:
      return new FullEventSeries(entity)
    case entityConstants.ENTITY_TYPE_TALENT:
      return new FullTalent(entity)
    case entityConstants.ENTITY_TYPE_VENUE:
      return new FullVenue(entity)
    default:
      throw new Error(`entityType ${entityType} not supported`)
  }
}
