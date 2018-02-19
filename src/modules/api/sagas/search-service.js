import { call } from 'redux-saga/effects'
import queryString from 'query-string'

import * as fetchLib from '_src/lib/fetch'
import autocompleteItemType from '_src/domain/types/autocomplete-item-type'

const SEARCH_SERVICE_URL = `${process.env.WEBSITE_API_HOST_URL}/search-service`

export function * getEntityCounts () {
  return yield call(
    fetchLib.get,
    `${SEARCH_SERVICE_URL}/admin/search/preset/entity-counts`
  )
}

export function * autocompleteSearch (query) {
  const stringified = queryString.stringify(query)
  const url = `${SEARCH_SERVICE_URL}/admin/search/auto?${stringified}`
  const json = yield call(fetchLib.get, url)
  const items = json.items

  items.forEach(
    item => (item.autocompleteItemType = autocompleteItemType.ENTITY)
  )

  return items
}

export function * basicSearch (query) {
  const stringified = queryString.stringify(query)
  const url = `${SEARCH_SERVICE_URL}/admin/search/basic?${stringified}`
  return yield call(fetchLib.get, url)
}
