import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { initialize } from 'redux-form'
import log from 'loglevel'

import history from '_src/history'
import normalise from '_src/lib/normalise'
import * as sagaLib from '_src/lib/saga'
import * as validationLib from '_src/lib/validation'
import * as searchLib from '../lib/search'
import * as searchConstants from '../constants'
import * as searchActions from '../actions'
import { searchService } from '_src/modules/api/index'

export function * pushBasicSearchToUrl ({ payload }) {
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

    const requestUrl = yield call(
      searchLib.createSearchPageUrl,
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

export function * autocompleteSearch ({ payload, meta }) {
  try {
    yield call(delay, 300) // debounce

    const query = yield call(
      normalise,
      payload.query,
      searchConstants.AUTO_SEARCH_QUERY_NORMALISER
    )

    yield call(
      validationLib.validate,
      query,
      searchConstants.AUTO_SEARCH_QUERY_CONSTRAINT,
      null
    )

    const queryStringParams = yield call(
      searchLib.createAutocompleteQueryStringParams,
      query
    )

    const items = yield call(
      searchService.autocompleteSearch,
      queryStringParams
    )

    yield put(sagaLib.returnAsPromise(items, meta))
  } catch (err) {
    yield call(log.error, err)
    yield put(sagaLib.returnAsPromise([], meta))
  }
}

export function * basicSearch ({ payload }) {
  try {
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
      true // TODO why am I not just throwing validation errors?
    )

    if (errors !== null) {
      yield call(log.error, 'basicSearch validation errors', errors)
      return
    }

    yield put(searchActions.startingBasicSearch())
    yield put(searchActions.setBasicSearchParams(query))
    yield put(initialize(searchConstants.BASIC_SEARCH_FORM_NAME, query))

    const queryStringParams = yield call(
      searchLib.createBasicSearchQueryStringParams,
      query
    )

    const json = yield call(searchService.basicSearch, queryStringParams)
    yield put(searchActions.basicSearchSucceeded(json))
  } catch (err) {
    yield call(log.error, err)

    yield call(
      sagaLib.submitErrorHandler,
      err,
      searchConstants.BASIC_SEARCH_FORM_NAME
    )

    yield put(searchActions.basicSearchFailed())
  }
}

export function * search (action) {
  try {
    const searchType = action.payload.searchType

    switch (searchType) {
      case searchConstants.SEARCH_TYPE_AUTOCOMPLETE:
        yield call(autocompleteSearch, action)
        break
      case searchConstants.SEARCH_TYPE_BASIC:
        yield call(basicSearch, action)
        break
      /* istanbul ignore next */
      default:
        throw new Error(`searchType is out of range: ${searchType}`)
    }
  } catch (err) {
    yield call(log.error, err)
  }
}

export function * navigateToEntity ({ payload }) {
  const entityUrl = `/${payload.entityType}/${payload.id}`
  yield call(history.push, entityUrl)
}

export default [
  takeLatest(searchActions.types.SEARCH, search),
  takeLatest(
    searchActions.types.PUSH_BASIC_SEARCH_TO_URL,
    pushBasicSearchToUrl
  ),
  takeLatest(searchActions.types.NAVIGATE_TO_ENTITY, navigateToEntity)
]
