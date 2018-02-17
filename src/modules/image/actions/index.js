export const types = {
  ADD_IMAGE: 'image/ADD_IMAGE',
  SET_MAIN_IMAGE: 'image/SET_MAIN_IMAGE',
  UPDATE_IMAGE: 'image/UPDATE_IMAGE',
  DELETE_IMAGE: 'image/DELETE_IMAGE'
}

export const addImage = (values, entityType, parentFormName) => ({
  type: types.ADD_IMAGE,
  payload: {
    ...values,
    entityType,
    parentFormName
  }
})

export const setMainImage = (id, parentFormName) => ({
  type: types.SET_MAIN_IMAGE,
  payload: { id, parentFormName }
})

export const updateImage = (values, id, parentFormName) => ({
  type: types.UPDATE_IMAGE,
  meta: { thunk: true },
  payload: { values, id, parentFormName }
})

export const deleteImage = (id, parentFormName) => ({
  type: types.DELETE_IMAGE,
  payload: { id, parentFormName }
})
