export const types = {
  GET_ENTITY: 'entity/GET_ENTITY',
  GET_ENTITY_STARTED: 'entity/GET_ENTITY_STARTED',
  GET_ENTITY_SUCCEEDED: 'entity/GET_ENTITY_SUCCEEDED',
  GET_ENTITY_FAILED: 'entity/GET_ENTITY_FAILED',
  SAVE_ENTITY: 'entity/SAVE_ENTITY',
  RESET_ENTITY_FOR_CREATE: 'entity/RESET_ENTITY_FOR_CREATE',
  CLEAR_ENTITY: 'entity/CLEAR_ENTITY'
  // UPDATE_ENTITY: 'entity/UPDATE_ENTITY',
  // AUTOCOMPLETE_SEARCH: 'entity/AUTOCOMPLETE_SEARCH',
  // AUTOCOMPLETE_SEARCH_SUCCEEDED: 'entity/AUTOCOMPLETE_SEARCH_SUCCEEDED',
  // GET_SUB_ENTITY: 'entity/GET_SUB_ENTITY',
  // GET_SUB_ENTITY_STARTED: 'entity/GET_SUB_ENTITY_STARTED',
  // GET_SUB_ENTITY_FINISHED: 'entity/GET_SUB_ENTITY_FINISHED',
  // CREATE_TALENT_FOR_EVENT: 'entity/CREATE_TALENT_FOR_EVENT',
  // GET_EVENT_AS_COPY: 'entity/GET_EVENT_AS_COPY',
  // GET_EVENT_AS_COPY_STARTED: 'entity/GET_EVENT_AS_COPY_STARTED',
  // GET_EVENT_AS_COPY_SUCCEEDED: 'entity/GET_EVENT_AS_COPY_SUCCEEDED',
  // GET_EVENT_AS_COPY_FAILED: 'entity/GET_EVENT_AS_COPY_FAILED',
  // TALENT_SELECTED: 'entity/TALENT_SELECTED'
}

export const getEntity = (entityType, id) => ({
  type: types.GET_ENTITY,
  payload: { entityType, id }
})

export const getEntityStarted = (entityType, id) => ({
  type: types.GET_ENTITY_STARTED,
  payload: { entityType, id }
})

export const getEntitySucceeded = (entityType, entity) => ({
  type: types.GET_ENTITY_SUCCEEDED,
  payload: { entityType, entity }
})

export const getEntityFailed = (entityType, statusCode) => ({
  type: types.GET_ENTITY_FAILED,
  payload: { entityType, statusCode: statusCode || 500 }
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

export const clearEntity = entityType => ({
  type: types.CLEAR_ENTITY,
  payload: { entityType }
})
