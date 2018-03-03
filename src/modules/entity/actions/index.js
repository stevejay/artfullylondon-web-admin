export const types = {
  GET_ENTITY: 'entity/GET_ENTITY',
  GET_ENTITY_STARTED: 'entity/GET_ENTITY_STARTED',
  GET_ENTITY_SUCCEEDED: 'entity/GET_ENTITY_SUCCEEDED',
  GET_ENTITY_FAILED: 'entity/GET_ENTITY_FAILED',
  SAVE_ENTITY: 'entity/SAVE_ENTITY',
  RESET_ENTITY_FOR_CREATE: 'entity/RESET_ENTITY_FOR_CREATE',
  CLEAR_ENTITY: 'entity/CLEAR_ENTITY',
  COPY_ENTITY: 'entity/COPY_ENTITY'
}

export const getEntity = (entityType, id) => ({
  type: types.GET_ENTITY,
  payload: { entityType, id }
})

export const getEntityStarted = id => ({
  type: types.GET_ENTITY_STARTED,
  payload: { id }
})

export const getEntitySucceeded = (entityType, entity) => ({
  type: types.GET_ENTITY_SUCCEEDED,
  payload: { entityType, entity }
})

export const getEntityFailed = statusCode => ({
  type: types.GET_ENTITY_FAILED,
  payload: { statusCode: statusCode || 500 }
})

export const copyEntity = (entityType, id) => ({
  type: types.COPY_ENTITY,
  payload: { entityType, id }
})

export const saveEntity = (
  entityType,
  values,
  isEdit,
  formName,
  normaliser,
  constraint,
  mapper
) => ({
  type: types.SAVE_ENTITY,
  payload: {
    entityType,
    values,
    isEdit,
    formName,
    normaliser,
    constraint,
    mapper
  }
})

export const resetEntityForCreate = entityType => ({
  type: types.RESET_ENTITY_FOR_CREATE,
  payload: { entityType }
})

export const clearEntity = () => ({
  type: types.CLEAR_ENTITY
})
