import { handleActions } from 'redux-actions'
import { ENTITY_TYPE_EVENT } from '_src/constants/entity'
import * as types from '_src/constants/entity'

const initialState = {
  entityId: null,
  entity: null,
  getInProgress: false,
  getFailed: false,
  getFailedStatusCode: null,
  selectedTalentId: null,
  eventMonitors: [],
  getEventMonitorsInProgress: false
}

export default function (entityType, EntityClass) {
  return handleActions({
    [types.GET_ENTITY_STARTED]: (state, action) => {
      if (action.payload.entityType !== entityType) {
        return state
      }

      return {
        ...state,
        entityId: action.payload.id,
        getInProgress: true,
        getFailed: false,
        getFailedStatusCode: null,
        eventMonitors: [],
        getEventMonitorsInProgress: false
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
        getFailedStatusCode: null,
        entity: new EntityClass(action.payload.entity)
      }
    },
    [types.GET_ENTITY_FAILED]: (state, action) => {
      if (action.payload.entityType !== entityType) {
        return state
      }

      return {
        ...initialState,
        getFailed: true,
        getFailedStatusCode: action.payload.statusCode
      }
    },
    [types.TALENT_SELECTED]: (state, action) => {
      if (entityType !== ENTITY_TYPE_EVENT) {
        return state
      }

      return {
        ...state,
        selectedTalentId: action.payload.talentId
      }
    }
  }, initialState)
}
