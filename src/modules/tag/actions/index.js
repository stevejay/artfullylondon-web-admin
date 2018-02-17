export const types = {
  GET_TAGS: 'tag/GET_TAGS',
  GET_TAGS_STARTED: 'tag/GET_TAGS_STARTED',
  GET_TAGS_SUCCEEDED: 'tag/GET_TAGS_SUCCEEDED',
  GET_TAGS_FAILED: 'tag/GET_TAGS_FAILED',
  ADD_TAG: 'tag/ADD_TAG',
  ADD_TAG_STARTED: 'tag/ADD_TAG_STARTED',
  ADD_TAG_SUCCEEDED: 'tag/ADD_TAG_SUCCEEDED',
  ADD_TAG_FAILED: 'tag/ADD_TAG_FAILED',
  DELETE_TAG: 'tag/DELETE_TAG',
  DELETE_TAG_STARTED: 'tag/DELETE_TAG_STARTED',
  DELETE_TAG_SUCCEEDED: 'tag/DELETE_TAG_SUCCEEDED',
  DELETE_TAG_FAILED: 'tag/DELETE_TAG_FAILED'
}

export const getTags = tagType => ({
  type: types.GET_TAGS,
  payload: { tagType }
})

export const getTagsStarted = tagType => ({
  type: types.GET_TAGS_STARTED,
  payload: { tagType }
})

export const getTagsSucceeded = tags => ({
  type: types.GET_TAGS_SUCCEEDED,
  payload: { tags }
})

export const getTagsFailed = () => ({
  type: types.GET_TAGS_FAILED
})

export const addTag = payload => ({
  type: types.ADD_TAG,
  payload
})

export const addTagStarted = () => ({
  type: types.ADD_TAG_STARTED
})

export const addTagSucceeded = tag => ({
  type: types.ADD_TAG_SUCCEEDED,
  payload: { tag }
})

export const addTagFailed = () => ({
  type: types.ADD_TAG_FAILED
})

export const deleteTag = id => ({
  type: types.DELETE_TAG,
  payload: { id }
})

export const deleteTagStarted = () => ({
  type: types.DELETE_TAG_STARTED
})

export const deleteTagSucceeded = id => ({
  type: types.DELETE_TAG_SUCCEEDED,
  payload: { id }
})

export const deleteTagFailed = () => ({
  type: types.DELETE_TAG_FAILED
})
