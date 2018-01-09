import { createAction } from 'redux-actions'
import * as types from '_src/constants/search'

export const search = createAction(types.SEARCH)
export const clearAutocomplete = createAction(types.CLEAR_AUTOCOMPLETE)

export const pushBasicSearchToUrl = createAction(
  types.PUSH_BASIC_SEARCH_TO_URL
)

export const navigateToEntity = createAction(types.NAVIGATE_TO_ENTITY)

export const basicSearchPageEntered = createAction(
  types.BASIC_SEARCH_PAGE_ENTERED
)
