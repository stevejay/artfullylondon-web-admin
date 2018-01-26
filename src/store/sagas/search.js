import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { initialize } from 'redux-form'
import log from 'loglevel'

import history from '_src/history'
import normalise from '_src/lib/normalise'
import * as fetchLib from '_src/lib/fetch'
import * as sagaLib from '_src/lib/saga'
import * as searchLib from '_src/lib/search'
import * as validationLib from '_src/lib/validation'
import * as searchConstants from '_src/constants/search'
import * as searchActionTypes from '_src/constants/action/search'
import * as formConstants from '_src/constants/form'

function * pushBasicSearchToUrl ({ payload }) {
  try {
    const { skip, take } = payload

    const query = yield call(
      normalise,
      payload.query,
      searchConstants.BASIC_SEARCH_QUERY_NORMALISER
    )

    yield call(
      validationLib.validate,
      query,
      searchConstants.BASIC_SEARCH_QUERY_CONSTRAINT,
      null
    )

    const requestUrl = searchLib.createSearchPageUrl(
      '/search',
      query,
      skip,
      take
    )

    yield call(history.push, requestUrl)
  } catch (err) {
    yield call(log.error, err)
  }
}

function * autocompleteSearch ({ payload, meta }) {
  yield call(delay, 300) // debounce

  const query = yield call(
    normalise,
    payload.query,
    searchConstants.AUTO_SEARCH_QUERY_NORMALISER
  )

  const errors = yield call(
    validationLib.validate,
    query,
    searchConstants.AUTO_SEARCH_QUERY_CONSTRAINT,
    null,
    true
  )

  let items = []

  if (errors !== null) {
    yield call(log.error, 'autocompleteSearch validation errors', errors)
  } else {
    try {
      const requestUrl = searchLib.createAutocompleteSearchRequestUrl(query)
      const json = yield call(fetchLib.get, requestUrl)
      items = json.items
    } catch (err) {
      yield call(log.error, err)
    }
  }

  items.forEach(
    item =>
      (item.autocompleteItemType =
        searchConstants.AUTOCOMPLETE_ITEM_TYPE_ENTITY)
  )

  yield put({
    type: searchActionTypes.AUTOCOMPLETE_SEARCH_SUCCEEDED,
    payload: { items },
    meta
  })
}

function * basicSearch ({ payload }) {
  try {
    // yield put(startSubmit(formConstants.BASIC_SEARCH_FORM_NAME))

    const query = yield call(
      normalise,
      payload.query,
      searchConstants.BASIC_SEARCH_QUERY_NORMALISER
    )

    const errors = yield call(
      validationLib.validate,
      query,
      searchConstants.BASIC_SEARCH_QUERY_CONSTRAINT,
      null,
      true
    )

    if (errors !== null) {
      yield call(log.error, 'basicSearch validation errors', errors)
      return
    }

    // const searchReducer = yield select(state => state.search)
    // const currentQuery = searchReducer.basicSearchParams
    // const existingItemsLength = searchReducer.items.length

    const requestUrl = searchLib.createBasicSearchRequestUrl(query)
    yield put({ type: searchActionTypes.STARTING_BASIC_SEARCH })

    yield put({
      type: searchActionTypes.SET_BASIC_SEARCH_PARAMS,
      payload: query
    })

    yield put(initialize(formConstants.BASIC_SEARCH_FORM_NAME, query))
    const json = yield call(fetchLib.get, requestUrl)

    yield put({
      type: searchActionTypes.BASIC_SEARCH_SUCCEEDED,
      payload: json
    })
  } catch (err) {
    yield call(log.error, err)

    yield call(
      sagaLib.submitErrorHandler,
      err,
      formConstants.BASIC_SEARCH_FORM_NAME
    )

    yield put({ type: searchActionTypes.BASIC_SEARCH_FAILED })
  } finally {
    // yield put(stopSubmit(formConstants.BASIC_SEARCH_FORM_NAME))
  }
}

function * search (action) {
  try {
    const searchType = action.payload.searchType

    switch (searchType) {
      case searchConstants.SEARCH_TYPE_AUTOCOMPLETE:
        yield call(autocompleteSearch, action)
        break
      case searchConstants.SEARCH_TYPE_BASIC:
        yield call(basicSearch, action)
        break
      default:
        throw new Error(`searchType is out of range: ${searchType}`)
    }
  } catch (err) {
    yield call(log.error, 'search error', err)
  }
}

function * navigateToEntity (action) {
  const entity = action.payload
  const entityUrl = `/${entity.entityType}/${entity.id}`
  yield call(history.push, entityUrl)
}

export default [
  takeLatest(searchActionTypes.SEARCH, search),
  takeLatest(searchActionTypes.PUSH_BASIC_SEARCH_TO_URL, pushBasicSearchToUrl),
  takeLatest(searchActionTypes.NAVIGATE_TO_ENTITY, navigateToEntity)
]
