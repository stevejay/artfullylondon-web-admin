import { handleActions } from 'redux-actions'
import _ from 'lodash'
import * as types from '_src/constants/tag'
import { getTagTypeFromTagId } from '_src/lib/tag'

const initialState = {
  getInProgress: false,
  getFailed: false,
  addInProgress: false,
  deleteInProgress: false,
  medium: [],
  style: [],
  geo: [],
  audience: []
}

export default handleActions(
  {
    [types.GET_TAGS_STARTING]: state => ({
      ...state,
      getInProgress: true,
      getFailed: false,
      addInProgress: false,
      deleteInProgress: false
    }),
    [types.GET_TAGS_SUCCEEDED]: (state, action) => {
      let { medium, style, geo, audience } = action.payload.tags

      medium = medium !== undefined
        ? _processReceivedTags(medium)
        : state.medium
      style = style !== undefined ? _processReceivedTags(style) : state.style
      geo = geo !== undefined ? _processReceivedTags(geo) : state.geo
      audience = audience !== undefined
        ? _processReceivedTags(audience)
        : state.audience

      return {
        ...state,
        getInProgress: false,
        deleteInProgress: false,
        medium: medium,
        style: style,
        geo: geo,
        audience: audience
      }
    },
    [types.GET_TAGS_FAILED]: state => ({
      ...state,
      getInProgress: false,
      getFailed: true
    }),
    [types.ADD_TAG_STARTING]: state => ({
      ...state,
      addInProgress: true
    }),
    [types.ADD_TAG_SUCCEEDED]: (state, action) => {
      const { payload: { tagType, tag } } = action

      let spliceIndex = _.findIndex(state[tagType], value => value.id > tag.id)
      if (spliceIndex === -1) {
        spliceIndex = state[tagType].length
      }

      const newTags = state[tagType].slice()
      newTags.splice(spliceIndex, 0, tag)

      const result = {
        ...state,
        addInProgress: false
      }

      result[tagType] = newTags
      return result
    },
    [types.ADD_TAG_FAILED]: state => ({
      ...state,
      addInProgress: false
    }),
    [types.DELETE_TAG_STARTING]: state => ({
      ...state,
      deleteInProgress: true
    }),
    [types.DELETE_TAG_SUCCEEDED]: (state, action) => {
      const id = action.payload.id
      const tagType = getTagTypeFromTagId(id)
      const deleteIndex = _.findIndex(state[tagType], value => value.id === id)

      const newTags = state[tagType].slice()
      newTags.splice(deleteIndex, 1)

      const result = {
        ...state,
        deleteInProgress: false
      }

      result[tagType] = newTags
      return result
    },
    [types.DELETE_TAG_FAILED]: state => ({
      ...state,
      deleteInProgress: false
    })
  },
  initialState
)

function _processReceivedTags (tags) {
  return _.sortBy(tags || [], x => x.id)
}
