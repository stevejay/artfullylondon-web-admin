import * as searchConstants from '../constants'

export const types = {
  PUSH_BASIC_SEARCH_TO_URL: 'search/PUSH_BASIC_SEARCH_TO_URL',
  SEARCH: 'search/SEARCH',
  SET_BASIC_SEARCH_PARAMS: 'search/SET_BASIC_SEARCH_PARAMS',
  STARTING_BASIC_SEARCH: 'search/STARTING_BASIC_SEARCH',
  BASIC_SEARCH_SUCCEEDED: 'search/BASIC_SEARCH_SUCCEEDED',
  BASIC_SEARCH_FAILED: 'search/BASIC_SEARCH_FAILED',
  AUTOCOMPLETE_SEARCH_SUCCEEDED: 'search/AUTOCOMPLETE_SEARCH_SUCCEEDED',
  NAVIGATE_TO_ENTITY: 'search/NAVIGATE_TO_ENTITY'
}

export const pushBasicSearchToUrl = payload => ({
  type: types.PUSH_BASIC_SEARCH_TO_URL,
  payload: { ...payload, searchType: searchConstants.SEARCH_TYPE_BASIC }
})

export const search = payload => ({
  type: types.SEARCH,
  payload
})

export const autocompleteSearch = (term, entityType) => ({
  type: types.SEARCH,
  payload: {
    searchType: searchConstants.SEARCH_TYPE_AUTOCOMPLETE,
    query: { term, entityType }
  },
  meta: { thunk: true }
})

export const setBasicSearchParams = payload => ({
  type: types.SET_BASIC_SEARCH_PARAMS,
  payload
})

export const startingBasicSearch = () => ({
  type: types.STARTING_BASIC_SEARCH
})

export const basicSearchSucceeded = payload => ({
  type: types.BASIC_SEARCH_SUCCEEDED,
  payload
})

export const basicSearchFailed = () => ({
  type: types.BASIC_SEARCH_FAILED
})

export const navigateToEntity = entity => ({
  type: types.NAVIGATE_TO_ENTITY,
  payload: entity
})
