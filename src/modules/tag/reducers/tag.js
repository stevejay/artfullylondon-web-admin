import { handleActions } from 'redux-actions'
import _ from 'lodash'

import { types } from '../actions'
import * as tagLib from '../lib/tag'

const EMPTY_ARRAY = []

const initialState = {
  getInProgress: false,
  getFailed: false,
  addInProgress: false,
  deleteInProgress: false,
  tags: null
}

export const reducer = handleActions(
  {
    [types.GET_TAGS_STARTED]: (state, action) => ({
      ...state,
      getInProgress: true,
      getFailed: false,
      addInProgress: false,
      deleteInProgress: false
    }),
    [types.GET_TAGS_SUCCEEDED]: (state, action) => ({
      ...state,
      getInProgress: false,
      deleteInProgress: false,
      tags: {
        ...state.tags,
        ..._.mapValues(action.payload.tags, tagLib.processReceivedTags)
      }
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
      const { payload: { tag, tagType } } = action

      if (_.isNil(state.tags)) {
        return {
          ...state,
          addInProgress: false
        }
      }

      const newTags = (state.tags[tagType] || []).slice()
      let spliceIndex = _.findIndex(newTags, value => value.id > tag.id)

      if (spliceIndex === -1) {
        spliceIndex = newTags.length
      }

      newTags.splice(spliceIndex, 0, tag)

      return {
        ...state,
        addInProgress: false,
        tags: {
          ...state.tags,
          [tagType]: newTags
        }
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
      const tagType = tagLib.getTagTypeFromTagId(id)

      if (_.isNil(state.tags) || _.isNil(state.tags[tagType])) {
        return {
          ...state,
          deleteInProgress: false
        }
      }

      const newTags = state.tags[tagType].slice()
      const deleteIndex = _.findIndex(newTags, value => value.id === id)

      if (deleteIndex > -1) {
        newTags.splice(deleteIndex, 1)
      }

      return {
        ...state,
        deleteInProgress: false,
        tags: {
          ...state.tags,
          [tagType]: newTags
        }
      }
    },
    [types.DELETE_TAG_FAILED]: state => ({
      ...state,
      deleteInProgress: false
    })
  },
  initialState
)

export const selectors = {
  hasTags: state => !_.isNil(state.tags),
  getTagsForType: (state, tagType) => {
    if (_.isNil(state.tags)) {
      return null
    }

    return state.tags[tagType] || EMPTY_ARRAY
  },
  gettingTags: state => state.getInProgress,
  failedToGetTags: state => state.getFailed,
  addingTag: state => state.addInProgress,
  deletingTag: state => state.deleteInProgress
}
