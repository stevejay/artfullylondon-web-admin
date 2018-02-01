export const types = {
  ADD_LINK: 'link/ADD_LINK',
  DELETE_LINK: 'link/DELETE_LINK'
}

export const addLink = (values, parentFormName) => ({
  type: types.ADD_LINK,
  payload: { values, parentFormName }
})

export const deleteLink = (id, parentFormName) => ({
  type: types.DELETE_LINK,
  payload: { key: id, parentFormName }
})
