import { handleActions } from 'redux-actions'

import { types } from '../actions'
import * as entityFactory from '_src/domain/entity-factory'

// TODO can I get rid of entityId?

const initialState = {
  entityId: null,
  entity: null,
  getInProgress: false,
  getFailed: false
}

export const reducer = handleActions(
  {
    [types.CLEAR_ENTITY]: () => initialState,
    [types.RESET_ENTITY_FOR_CREATE]: (state, action) => ({
      ...initialState,
      entity: entityFactory.createEntity(action.payload.entityType)
    }),
    [types.GET_ENTITY_STARTED]: (state, action) => ({
      ...state,
      entityId: action.payload.id,
      entity: null,
      getInProgress: true,
      getFailed: false
    }),
    [types.GET_ENTITY_SUCCEEDED]: (state, action) => ({
      ...state,
      getInProgress: false,
      entity: entityFactory.createEntity(
        action.payload.entityType,
        action.payload.entity
      )
    }),
    [types.GET_ENTITY_FAILED]: (state, action) => ({
      ...initialState,
      getFailed: true
    })
  },
  initialState
)

export const selectors = {
  entity: state => state.entity,
  entityId: state => state.entityId,
  gettingEntity: (state, expectedEntityType) =>
    state.getInProgress ||
    !state.entity ||
    state.entity.entityType !== expectedEntityType ||
    (!!state.entityId && state.entityId !== state.entity.id),
  failedToGetEntity: state => state.getFailed
}
