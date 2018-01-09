import moment from 'moment'
import {
  mapJsDateToStringDate,
  mapMomentDateToStringDate
} from '_src/lib/time'
import { DEFAULT_TAKE } from '_src/constants/search'

export function maybeHasMoreSearchResults (entityType, items, take) {
  const threshold = Math.floor(take / 4)
  const entities = items.filter(x => x.entityType === entityType)
  return entities.length >= threshold
}

export function createSearchPageUrl (baseUrl, query, skip, take) {
  const params = Object.assign({}, query)
  _addSkipToParams(params, query.skip, skip)
  _addTakeToParams(params, query.take, take)
  return baseUrl + '?' + _createQueryString(params)
}

export function createAdminAutocompleteSearchRequestUrl (query) {
  const params = {}

  if (query.term) {
    params.term = query.term
  }

  if (query.entityType) {
    params.entityType = query.entityType
  }

  const queryString = _createQueryString(params)

  return `${process.env.ARTFULLY_LONDON_API_URL}/search-service/admin/search/auto?${queryString}`
}

export function createAdminBasicSearchRequestUrl (query, skip, take) {
  const params = {}

  if (query.term) {
    params.term = query.term
  }

  if (query.entityType) {
    params.entityType = query.entityType
  }

  _addSkipToParams(params, query.skip, skip)
  _addTakeToParams(params, query.take, take)
  const queryString = _createQueryString(params)

  return `${process.env.ARTFULLY_LONDON_API_URL}/search-service/admin/search/basic?${queryString}`
}

function _createQueryString (params) {
  const keyValuePairs = []

  Object.keys(params).forEach(key => {
    let value = params[key]

    if (value == null) {
      return
    }

    if (moment.isMoment(value)) {
      value = mapMomentDateToStringDate(value)
    } else if (value instanceof Date) {
      value = mapJsDateToStringDate(value)
    }

    const keyValuePair = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    keyValuePairs.push(keyValuePair)
  })

  return keyValuePairs.join('&')
}

function _addSkipToParams (params, querySkip, skip) {
  if (skip != null) {
    params.skip = skip
  } else if (querySkip != null) {
    params.skip = querySkip
  }
}

function _addTakeToParams (params, queryTake, take) {
  if (take != null) {
    params.take = take
  } else if (queryTake != null) {
    params.take = queryTake
  } else {
    params.take = DEFAULT_TAKE
  }
}
