import { handleActions } from 'redux-actions'
import _ from 'lodash'

import { types } from '../actions'
import { actions as tagActions } from '_src/modules/tag'
import { actions as entityActions } from '_src/modules/entity'
import entityType from '_src/domain/types/entity-type'

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
    },
    [entityActions.types.RESET_ENTITY_FOR_CREATE]: (state, action) =>
      (action.payload.entityType === entityType.EVENT ? initialState : state),
    [entityActions.types.GET_ENTITY]: (state, action) =>
      (action.payload.entityType === entityType.EVENT ? initialState : state)
  },
  initialState
)

export const selectors = {
  selectedTalentId: state => state.selectedTalentId,
  tags: state => state.tags,
  hasTags: state => !!state.tags
}
