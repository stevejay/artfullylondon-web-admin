import { createSelector } from 'reselect'

// parameters: (state, tagType)
export const getTagsForType = createSelector(
  state => state.tag.tags,
  state => state.tag.tagType,
  (state, tagType) => tagType,
  (tags, reducerTagType, requestedTagType) =>
    (requestedTagType !== reducerTagType ? null : tags)
)
