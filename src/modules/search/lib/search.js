import queryString from 'query-string'

import * as globalConstants from '_src/constants'

export function maybeHasMoreSearchResults (entityType, items, take) {
  const threshold = Math.floor(take / 4)
  const entities = items.filter(x => x.entityType === entityType)
  return entities.length >= threshold
}

export function createSearchPageUrl (baseUrl, query, skip, take) {
  const params = { ...query }
  addSkipToParams(params, query.skip, skip)
  addTakeToParams(params, query.take, take)
  return baseUrl + '?' + queryString.stringify(params)
}

export function createAutocompleteQueryStringParams (query) {
  const params = {}

  if (query.term) {
    params.term = query.term
  }

  if (query.entityType) {
    params.entityType = query.entityType
  }

  return params
}

export function createBasicSearchQueryStringParams (query, skip, take) {
  const params = {}

  if (query.term) {
    params.term = query.term
  }

  if (query.entityType) {
    params.entityType = query.entityType
  }

  addSkipToParams(params, query.skip, skip)
  addTakeToParams(params, query.take, take)

  return params
}

function addSkipToParams (params, querySkip, skip) {
  if (skip != null) {
    params.skip = skip
  } else if (querySkip != null) {
    params.skip = querySkip
  }
}

function addTakeToParams (params, queryTake, take) {
  if (take != null) {
    params.take = take
  } else if (queryTake != null) {
    params.take = queryTake
  } else {
    params.take = globalConstants.DEFAULT_TAKE
  }
}
