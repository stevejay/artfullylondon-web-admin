import { handleActions } from 'redux-actions'
import _ from 'lodash'

import * as tagActionTypes from '_src/constants/action/tag'
import * as tagLib from '_src/lib/tag'

const initialState = {
  getInProgress: false,
  getFailed: false,
  addInProgress: false,
  deleteInProgress: false,
  tagType: null,
  tags: null
}

export default handleActions(
  {
    [tagActionTypes.GET_TAGS_STARTED]: (state, action) => ({
      ...state,
      getInProgress: true,
      getFailed: false,
      addInProgress: false,
      deleteInProgress: false,
      tagType: action.payload.tagType,
      tags: null
    }),
    [tagActionTypes.GET_TAGS_SUCCEEDED]: (state, action) => ({
      ...state,
      getInProgress: false,
      deleteInProgress: false,
      tags: tagLib.processReceivedTags(action.payload.tags)
    }),
    [tagActionTypes.GET_TAGS_FAILED]: state => ({
      ...state,
      getInProgress: false,
      getFailed: true
    }),
    [tagActionTypes.ADD_TAG_STARTED]: state => ({
      ...state,
      addInProgress: true
    }),
    [tagActionTypes.ADD_TAG_SUCCEEDED]: (state, action) => {
      const { payload: { tag } } = action

      let spliceIndex = _.findIndex(state.tags, value => value.id > tag.id)

      if (spliceIndex === -1) {
        spliceIndex = state.tags.length
      }

      const newTags = state.tags.slice()
      newTags.splice(spliceIndex, 0, tag)

      return {
        ...state,
        addInProgress: false,
        tags: newTags
      }
    },
    [tagActionTypes.ADD_TAG_FAILED]: state => ({
      ...state,
      addInProgress: false
    }),
    [tagActionTypes.DELETE_TAG_STARTED]: state => ({
      ...state,
      deleteInProgress: true
    }),
    [tagActionTypes.DELETE_TAG_SUCCEEDED]: (state, action) => {
      const id = action.payload.id
      const deleteIndex = _.findIndex(state.tags, value => value.id === id)

      const newTags = state.tags.slice()
      newTags.splice(deleteIndex, 1)

      return {
        ...state,
        deleteInProgress: false,
        tags: newTags
      }
    },
    [tagActionTypes.DELETE_TAG_FAILED]: state => ({
      ...state,
      deleteInProgress: false
    })
  },
  initialState
)
