import { put, call, takeLatest } from 'redux-saga/effects'
import * as types from '_src/constants/status'
import { get } from '_src/lib/fetch'

export function * getEntityCounts () {
  try {
    yield put.resolve({ type: types.GET_ENTITY_COUNTS_STARTED })

    const url = `${process.env.WEBSITE_API_HOST_URL}/search-service/admin/search/preset/entity-counts`
    const json = yield call(get, url)

    yield put.resolve({
      type: types.GET_ENTITY_COUNTS_SUCCEEDED,
      payload: json
    })
  } catch (err) {
    console.error('getEntityCounts error', err)
    yield put.resolve({ type: types.GET_ENTITY_COUNTS_FAILED })
  }
}

export default [takeLatest(types.GET_ENTITY_COUNTS, getEntityCounts)]
