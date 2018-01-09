import { delay } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import _ from 'lodash'
import history from '_src/history'
import { startSubmit, stopSubmit, initialize } from 'redux-form'
import normalise from '_src/lib/normalise'
import { get } from '_src/lib/fetch'
import { submitErrorHandler } from '_src/lib/saga'
import {
  SEARCH_TYPE_AUTOCOMPLETE,
  SEARCH_TYPE_BASIC
} from '_src/constants/search'
import { validate } from '_src/lib/validation'
import * as types from '_src/constants/search'
import { BASIC_SEARCH_FORM_NAME } from '_src/constants/form'
import { HIDE_QUICKSEARCH } from '_src/constants/modal'
import {
  createAdminAutocompleteSearchRequestUrl,
  createAdminBasicSearchRequestUrl,
  createSearchPageUrl
} from '_src/lib/search'

function * pushBasicSearchToUrl ({ payload }) {
  try {
    const { skip, take } = payload
    const query = normalise(payload.query, types.BASIC_SEARCH_QUERY_NORMALISER)
    yield call(validate, query, types.BASIC_SEARCH_QUERY_CONSTRAINT, null)
    const requestUrl = createSearchPageUrl('/search', query, skip, take)
    yield call(history.push, requestUrl)
  } catch (err) {
    console.error(err)
  }
}

function * autocompleteSearch ({ payload }) {
  yield call(delay, 300) // debounce
  const query = normalise(payload.query, types.AUTO_SEARCH_QUERY_NORMALISER)
  const errors = yield call(
    validate,
    query,
    types.AUTO_SEARCH_QUERY_CONSTRAINT,
    null,
    true
  )

  if (errors !== null) {
    console.error('autocompleteSearch validation errors', errors)
    return
  }

  const requestUrl = createAdminAutocompleteSearchRequestUrl(query)
  const json = yield call(get, requestUrl)

  yield put.resolve({
    type: types.AUTOCOMPLETE_SEARCH_SUCCEEDED,
    payload: json
  })
}

function * basicSearch ({ payload }) {
  try {
    const query = normalise(payload.query, types.BASIC_SEARCH_QUERY_NORMALISER)
    const errors = yield call(
      validate,
      query,
      types.BASIC_SEARCH_QUERY_CONSTRAINT,
      null,
      true
    )

    if (errors !== null) {
      console.error('basicSearch validation errors', errors)
      return
    }

    yield put.resolve(startSubmit(BASIC_SEARCH_FORM_NAME))

    const searchReducer = yield select(state => state.search)
    const currentQuery = searchReducer.basicSearchParams
    const existingItemsLength = searchReducer.items.length

    if (_.isEqual(query, currentQuery) && existingItemsLength) {
      yield call(delay, 300)
      yield put.resolve(stopSubmit(BASIC_SEARCH_FORM_NAME))
      return
    }

    const requestUrl = createAdminBasicSearchRequestUrl(query)
    yield put.resolve({ type: types.CLEAR_AUTOCOMPLETE })
    yield put.resolve({ type: types.STARTING_BASIC_SEARCH })
    yield put.resolve({ type: types.SET_BASIC_SEARCH_PARAMS, payload: query })
    yield put.resolve(initialize(BASIC_SEARCH_FORM_NAME, query))
    const json = yield call(get, requestUrl)
    yield put.resolve({ type: types.BASIC_SEARCH_SUCCEEDED, payload: json })
    yield put.resolve(stopSubmit(BASIC_SEARCH_FORM_NAME))
  } catch (err) {
    yield call(submitErrorHandler, err, BASIC_SEARCH_FORM_NAME)
    yield put.resolve({ type: types.BASIC_SEARCH_FAILED })
  }
}

function * search (action) {
  try {
    const searchType = action.payload.searchType

    switch (searchType) {
      case SEARCH_TYPE_AUTOCOMPLETE:
        yield call(autocompleteSearch, action)
        break
      case SEARCH_TYPE_BASIC:
        yield call(basicSearch, action)
        break
      default:
        throw new Error(`searchType is out of range: ${searchType}`)
    }
  } catch (err) {
    console.error('search error', err)
  }
}

function * navigateToEntity (action) {
  const entity = action.payload
  const entityUrl = `/${entity.entityType}/${entity.id}`
  yield put.resolve({ type: HIDE_QUICKSEARCH })
  yield call(history.push, entityUrl)
}

export default [
  takeLatest(types.SEARCH, search),
  takeLatest(types.PUSH_BASIC_SEARCH_TO_URL, pushBasicSearchToUrl),
  takeLatest(types.NAVIGATE_TO_ENTITY, navigateToEntity)
]
