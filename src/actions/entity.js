import { createAction } from 'redux-actions'
import * as entityActionTypes from '_src/constants/action/entity'

export const saveEntity = createAction(entityActionTypes.SAVE_ENTITY)
export const getEntityForEdit = createAction(
  entityActionTypes.GET_ENTITY_FOR_EDIT
)
export const resetEntityForEdit = createAction(
  entityActionTypes.RESET_ENTITY_FOR_EDIT
)
export const updateEntityForEdit = createAction(
  entityActionTypes.UPDATE_ENTITY_FOR_EDIT
)
export const autocompleteSearch = createAction(
  entityActionTypes.AUTOCOMPLETE_SEARCH
)
export const getSubEntity = createAction(entityActionTypes.GET_SUB_ENTITY)
export const createTalentForEvent = createAction(
  entityActionTypes.CREATE_TALENT_FOR_EVENT
)
export const getEventAsCopy = createAction(entityActionTypes.GET_EVENT_AS_COPY)
export const talentSelected = createAction(entityActionTypes.TALENT_SELECTED)
