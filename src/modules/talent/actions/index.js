export const types = {
  CREATE_TALENT_FOR_ENTITY: 'talent/CREATE_TALENT_FOR_ENTITY'
}

export const createTalentForEntity = (values, parentFormName) => ({
  type: types.CREATE_TALENT_FOR_ENTITY,
  payload: {
    values,
    parentFormName
  },
  meta: { thunk: true }
})
