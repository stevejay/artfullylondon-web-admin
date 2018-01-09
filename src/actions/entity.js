import { createAction } from 'redux-actions'
import * as types from '_src/constants/entity'

export const getEntity = createAction(types.GET_ENTITY)
export const saveEntity = createAction(types.SAVE_ENTITY)
export const getEntityForEdit = createAction(types.GET_ENTITY_FOR_EDIT)
export const resetEntityForEdit = createAction(types.RESET_ENTITY_FOR_EDIT)
export const updateEntityForEdit = createAction(types.UPDATE_ENTITY_FOR_EDIT)
export const autocompleteSearch = createAction(types.AUTOCOMPLETE_SEARCH)
export const clearAutocomplete = createAction(types.CLEAR_AUTOCOMPLETE)
export const getSubEntity = createAction(types.GET_SUB_ENTITY)
export const createTalentForEvent = createAction(types.CREATE_TALENT_FOR_EVENT)
export const getEventAsCopy = createAction(types.GET_EVENT_AS_COPY)
export const talentSelected = createAction(types.TALENT_SELECTED)
