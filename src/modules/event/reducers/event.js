import { handleActions } from 'redux-actions'

import { types } from '../actions'

const initialState = {
  selectedTalentId: null
}

export const reducer = handleActions(
  {
    [types.UPDATE_SELECTED_TALENT]: (state, action) => ({
      ...state,
      selectedTalentId: action.payload.talentId
    })
  },
  initialState
)

export const selectors = {
  selectedTalentId: state => state.selectedTalentId
}
