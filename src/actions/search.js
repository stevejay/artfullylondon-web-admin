import { createAction } from 'redux-actions'
import * as searchActionTypes from '_src/constants/action/search'

export const search = createAction(searchActionTypes.SEARCH)

export const clearAutocomplete = createAction(
  searchActionTypes.CLEAR_AUTOCOMPLETE
)

export const pushBasicSearchToUrl = createAction(
  searchActionTypes.PUSH_BASIC_SEARCH_TO_URL
)

export const navigateToEntity = createAction(
  searchActionTypes.NAVIGATE_TO_ENTITY
)

export const basicSearchPageEntered = createAction(
  searchActionTypes.BASIC_SEARCH_PAGE_ENTERED
)
