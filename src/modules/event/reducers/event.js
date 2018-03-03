import { handleActions } from 'redux-actions'

import { types } from '../actions'
import { actions as entityActions } from '_src/modules/entity'
import entityType from '_src/domain/types/entity-type'

const initialState = {
  selectedTalentId: null
}

export const reducer = handleActions(
  {
    [types.UPDATE_SELECTED_TALENT]: (state, action) => ({
      ...state,
      selectedTalentId: action.payload.talentId
    }),
    [entityActions.types.RESET_ENTITY_FOR_CREATE]: (state, action) =>
      (action.payload.entityType === entityType.EVENT ? initialState : state),
    [entityActions.types.GET_ENTITY]: (state, action) =>
      (action.payload.entityType === entityType.EVENT ? initialState : state)
  },
  initialState
)

export const selectors = {
  selectedTalentId: state => state.selectedTalentId
}
