export const types = {
  UPDATE_SELECTED_TALENT: 'event/UPDATE_SELECTED_TALENT',
  GET_SUB_ENTITY: 'event/GET_SUB_ENTITY',
  GET_SUB_ENTITY_STARTED: 'event/GET_SUB_ENTITY_STARTED'
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
