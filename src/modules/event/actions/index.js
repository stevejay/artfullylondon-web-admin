export const types = {
  UPDATE_SELECTED_TALENT: 'event/UPDATE_SELECTED_TALENT'
}

export const updateSelectedTalent = talentId => ({
  type: types.UPDATE_SELECTED_TALENT,
  payload: { talentId }
})
