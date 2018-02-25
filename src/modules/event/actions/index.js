export const types = {
  UPDATE_SELECTED_TALENT: 'event/UPDATE_SELECTED_TALENT',
  GET_SUB_ENTITY: 'event/GET_SUB_ENTITY',
  GET_ALL_TAGS: 'event/GET_ALL_TAGS',
  GET_ALL_TAGS_SUCCEEDED: 'event/GET_ALL_TAGS_SUCCEEDED'
}

export const updateSelectedTalent = talentId => ({
  type: types.UPDATE_SELECTED_TALENT,
  payload: { talentId }
})

export const getSubEntity = (subEntityType, id, parentFormName) => ({
  type: types.GET_SUB_ENTITY,
  payload: { subEntityType, id, parentFormName },
  meta: { thunk: true }
})

export const getAllTags = () => ({
  type: types.GET_ALL_TAGS
})

export const getAllTagsSucceeded = tags => ({
  type: types.GET_ALL_TAGS_SUCCEEDED,
  payload: { tags }
})
