import { handleActions } from 'redux-actions'
import _ from 'lodash'

import { types } from '../actions'
import { actions as tagActions } from '_src/modules/tag'

const initialState = {
  selectedTalentId: null,
  tags: null
}

export const reducer = handleActions(
  {
    [types.UPDATE_SELECTED_TALENT]: (state, action) => ({
      ...state,
      selectedTalentId: action.payload.talentId
    }),
    [types.GET_ALL_TAGS_SUCCEEDED]: (state, action) => ({
      ...state,
      tags: action.payload.tags
    }),
    [tagActions.types.ADD_TAG_SUCCEEDED]: (state, action) => {
      const { tag, tagType } = action.payload

      if (_.isNil(state.tags) || _.isNil(state.tags[tagType])) {
        return state
      }

      return {
        ...state,
        tags: {
          ...state.tags,
          [tagType]: _.sortBy([...state.tags[tagType], tag], x => x.id)
        }
      }
    }
  },
  initialState
)

export const selectors = {
  selectedTalentId: state => state.selectedTalentId,
  tags: state => state.tags
}
