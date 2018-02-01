import { handleActions } from 'redux-actions'
import _ from 'lodash'

import { types } from '_src/store/actions/tag'
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
    [types.GET_TAGS_STARTED]: (state, action) => ({
      ...state,
      getInProgress: true,
      getFailed: false,
      addInProgress: false,
      deleteInProgress: false,
      tagType: action.payload.tagType,
      tags: null
    }),
    [types.GET_TAGS_SUCCEEDED]: (state, action) => ({
      ...state,
      getInProgress: false,
      deleteInProgress: false,
      tags: tagLib.processReceivedTags(action.payload.tags)
    }),
    [types.GET_TAGS_FAILED]: state => ({
      ...state,
      getInProgress: false,
      getFailed: true
    }),
    [types.ADD_TAG_STARTED]: state => ({
      ...state,
      addInProgress: true
    }),
    [types.ADD_TAG_SUCCEEDED]: (state, action) => {
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
    [types.ADD_TAG_FAILED]: state => ({
      ...state,
      addInProgress: false
    }),
    [types.DELETE_TAG_STARTED]: state => ({
      ...state,
      deleteInProgress: true
    }),
    [types.DELETE_TAG_SUCCEEDED]: (state, action) => {
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
    [types.DELETE_TAG_FAILED]: state => ({
      ...state,
      deleteInProgress: false
    })
  },
  initialState
)
