import { handleActions } from 'redux-actions'

import { types } from '../actions'

const initialState = { talentId: null }

export const reducer = handleActions(
  {
    [types.UPDATE_SELECTED_TALENT]: (state, action) => ({
      ...state,
      talentId: action.payload.talentId
    })
  },
  initialState
)

export const selectors = {
  selectedTalentId: state => state.talentId
}
