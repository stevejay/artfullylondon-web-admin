import { createSelector } from 'reselect'

const EMPTY_TAGS = []

// parameters: (state, tagType)
export const getTagsForType = createSelector(
  state => state.tag,
  (state, tagType) => tagType,
  (tag, tagType) => tag[tagType] || EMPTY_TAGS
)
