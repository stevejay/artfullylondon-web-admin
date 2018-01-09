import { delay } from 'redux-saga'
import _ from 'lodash'
import { call, put, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset, arrayPush, change } from 'redux-form'
import { get, put as httpPut, post } from '_src/lib/fetch'
import { submitErrorHandler } from '_src/lib/saga'
import { validate } from '_src/lib/validation'
import normalise from '_src/lib/normalise'
import {
  ENTITY_TYPE_TALENT,
  ENTITY_TYPE_VENUE,
  ENTITY_TYPE_EVENT,
  ENTITY_TYPE_EVENT_SERIES
} from '_src/constants/entity'
import * as types from '_src/constants/entity'
import {
  EDIT_TALENT_FORM_NAME,
  EDIT_VENUE_FORM_NAME,
  EDIT_EVENT_IMAGES_FORM_NAME,
  EDIT_EVENT_SERIES_FORM_NAME,
  CREATE_TALENT_FORM_NAME
} from '_src/constants/form'
import {
  AUTO_SEARCH_QUERY_NORMALISER,
  AUTO_SEARCH_QUERY_CONSTRAINT
} from '_src/constants/search'
import { getAuthTokenForCurrentUser } from '_src/lib/auth'
import {
  createAdminAutocompleteSearchRequestUrl,
  createAdminBasicSearchRequestUrl
} from '_src/lib/search'
import TalentMatchesFoundModal
  from '_src/containers/Modals/TalentMatchesFound'
import { addNotification } from '_src/actions/notifications'
import talentConstraint from '_src/constants/talent-constraint'
import talentNormaliser from '_src/constants/talent-normaliser'
import venueConstraint from '_src/constants/venue-constraint'
import venueNormaliser from '_src/constants/venue-normaliser'
import eventSeriesConstraint from '_src/constants/event-series-constraint'
import eventSeriesNormaliser from '_src/constants/event-series-normaliser'
import * as eventConstraints from '_src/constants/event-constraints'
import * as eventNormalisers from '_src/constants/event-normalisers'
import * as modalTypes from '_src/constants/modal'
import {
  mapTalentToServer,
  mapVenueToServer,
  mapEventToServer,
  mapEventSeriesToServer
} from '_src/lib/mappings'
import history from '_src/history'

function * getEntity (action) {
  const { entityType, id } = action.payload

  try {
    yield put.resolve({
      type: types.GET_ENTITY_STARTED,
      payload: { entityType, id }
    })

    const token = yield getAuthTokenForCurrentUser()
    const url = `${process.env.ARTFULLY_LONDON_API_URL}/event-service/admin/${entityType}/${id}`
    const json = yield call(get, url, token)

    yield put.resolve({
      type: types.GET_ENTITY_SUCCEEDED,
      payload: { entityType, entity: json.entity }
    })
  } catch (err) {
    console.error('getEntity error', err.message)

    yield put.resolve({
      type: types.GET_ENTITY_FAILED,
      payload: { entityType, statusCode: err.statusCode || 500 }
    })
  }
}

function * saveEntity (action) {
  const { entityType, isEdit } = action.payload
  const formName = _getFormNameForEntityType(entityType)

  try {
    yield put.resolve(startSubmit(formName))

    const normaliser = _getNormaliserForEntityType(entityType)
    const values = yield call(normalise, action.payload.values, normaliser)

    const constraint = _getConstraintForEntityType(entityType)
    yield call(validate, values, constraint)

    const token = yield getAuthTokenForCurrentUser()
    const mapper = _getMapperForEntityType(entityType)
    let json = null

    if (isEdit) {
      const url = `${process.env.ARTFULLY_LONDON_API_URL}/event-service/admin/${entityType}/${values.id}`
      json = yield call(httpPut, url, mapper(values), token)
    } else {
      const url = `${process.env.ARTFULLY_LONDON_API_URL}/event-service/admin/${entityType}`
      json = yield call(post, url, mapper(values), token)
    }

    yield put.resolve(stopSubmit(formName))

    if (isEdit) {
      yield call(history.goBack)
    } else {
      yield call(history.push, `/${entityType}/${json.entity.id}`)
    }
  } catch (err) {
    console.error('saveEntity error', err)

    yield put.resolve(
      addNotification({
        type: 'Error',
        title: 'Save Failed',
        // message: 'This form has errors. Please correct them and try again.'
        message: err.message
      })
    )

    yield call(submitErrorHandler, err, formName)
  }
}

function _getConstraintForEntityType (entityType) {
  switch (entityType) {
    case ENTITY_TYPE_TALENT:
      return talentConstraint
    case ENTITY_TYPE_VENUE:
      return venueConstraint
    case ENTITY_TYPE_EVENT:
      return eventConstraints.BASIC_CONSTRAINT
    case ENTITY_TYPE_EVENT_SERIES:
      return eventSeriesConstraint
    default:
      throw new Error(`entityType out of range: ${entityType}`)
  }
}

function _getNormaliserForEntityType (entityType) {
  switch (entityType) {
    case ENTITY_TYPE_TALENT:
      return talentNormaliser
    case ENTITY_TYPE_VENUE:
      return venueNormaliser
    case ENTITY_TYPE_EVENT:
      return eventNormalisers.basicNormaliser
    case ENTITY_TYPE_EVENT_SERIES:
      return eventSeriesNormaliser
    default:
      throw new Error(`entityType out of range: ${entityType}`)
  }
}

function _getMapperForEntityType (entityType) {
  switch (entityType) {
    case ENTITY_TYPE_TALENT:
      return mapTalentToServer
    case ENTITY_TYPE_VENUE:
      return mapVenueToServer
    case ENTITY_TYPE_EVENT:
      return mapEventToServer
    case ENTITY_TYPE_EVENT_SERIES:
      return mapEventSeriesToServer
    default:
      throw new Error(`entityType out of range: ${entityType}`)
  }
}

function _getFormNameForEntityType (entityType) {
  switch (entityType) {
    case ENTITY_TYPE_TALENT:
      return EDIT_TALENT_FORM_NAME
    case ENTITY_TYPE_VENUE:
      return EDIT_VENUE_FORM_NAME
    case ENTITY_TYPE_EVENT:
      return EDIT_EVENT_IMAGES_FORM_NAME
    case ENTITY_TYPE_EVENT_SERIES:
      return EDIT_EVENT_SERIES_FORM_NAME
    default:
      throw new Error(`entityType out of range: ${entityType}`)
  }
}

function * getEntityForEdit (action) {
  const { entityType, id } = action.payload

  try {
    yield put.resolve({
      type: types.GET_ENTITY_FOR_EDIT_STARTED,
      payload: { entityType, id }
    })

    const token = yield getAuthTokenForCurrentUser()
    console.log('token', token)

    const url = `${process.env.ARTFULLY_LONDON_API_URL}/event-service/admin/edit/${entityType}/${id}`
    const json = yield call(get, url, token)

    yield put.resolve({
      type: types.GET_ENTITY_FOR_EDIT_SUCCEEDED,
      payload: { entityType, entity: json.entity }
    })
  } catch (err) {
    console.error('getEntityForEdit error', err.message)

    yield put.resolve({
      type: types.GET_ENTITY_FOR_EDIT_FAILED,
      payload: { entityType, statusCode: err.statusCode || 500 }
    })
  }
}

function * getEventAsCopy (action) {
  const { id } = action.payload

  try {
    yield put.resolve({ type: types.GET_EVENT_AS_COPY_STARTED })

    const token = yield getAuthTokenForCurrentUser()
    const url = `${process.env.ARTFULLY_LONDON_API_URL}/event-service/admin/edit/event/${id}`
    const json = yield call(get, url, token)

    yield put.resolve({
      type: types.GET_EVENT_AS_COPY_SUCCEEDED,
      payload: { entity: json.entity }
    })
  } catch (err) {
    console.error('getEventAsCopy error', err.message)

    yield put.resolve({
      type: types.GET_EVENT_AS_COPY_FAILED,
      payload: { statusCode: err.statusCode || 500 }
    })
  }
}

function * getSubEntity (action) {
  const { entityType, subEntityType, id, parentFormName } = action.payload

  try {
    yield put.resolve({
      type: types.GET_SUB_ENTITY_STARTED,
      payload: { entityType, subEntityType }
    })

    const token = yield getAuthTokenForCurrentUser()
    const url = `${process.env.ARTFULLY_LONDON_API_URL}/event-service/admin/edit/${subEntityType}/${id}`
    const json = yield call(get, url, token)

    yield put.resolve(
      change(parentFormName, _.camelCase(subEntityType), json.entity)
    )
  } catch (err) {
    console.error('getEntityForEdit error', err.message)

    yield put.resolve(
      addNotification({
        type: 'Error',
        title: 'Get Failed',
        message: 'The entity could not be read.'
      })
    )
  } finally {
    yield put.resolve({
      type: types.GET_SUB_ENTITY_FINISHED,
      payload: { entityType, subEntityType }
    })
  }
}

function * autocompleteSearch (action) {
  try {
    yield call(delay, 300) // debounce
    const query = normalise(action.payload.query, AUTO_SEARCH_QUERY_NORMALISER)
    const errors = yield call(
      validate,
      query,
      AUTO_SEARCH_QUERY_CONSTRAINT,
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
  } catch (err) {
    console.error('autocompleteSearch failed', err)
  }
}

function * createTalentForEvent (action) {
  const { values, parentFormName, forceCreate } = action.payload

  try {
    yield put.resolve(startSubmit(CREATE_TALENT_FORM_NAME))
    yield call(validate, values, talentConstraint)

    if (!forceCreate) {
      const query = {
        entityType: 'talent',
        term: `${values.firstNames} ${values.lastName}`,
        take: 5
      }

      const requestUrl = createAdminBasicSearchRequestUrl(query)
      const json = yield call(get, requestUrl)

      if (json.total > 0) {
        yield put.resolve({
          type: modalTypes.SHOW_MODAL,
          payload: {
            component: TalentMatchesFoundModal,
            componentProps: {
              items: json.items,
              values,
              parentFormName
            }
          }
        })

        yield put.resolve(stopSubmit(CREATE_TALENT_FORM_NAME))
        return
      }
    }

    const token = yield getAuthTokenForCurrentUser()
    const url = `${process.env.ARTFULLY_LONDON_API_URL}/event-service/admin/talent`
    const mappedValues = mapTalentToServer(values)
    const json = yield call(post, url, mappedValues, token)

    yield put.resolve(stopSubmit(CREATE_TALENT_FORM_NAME))
    yield put.resolve(reset(CREATE_TALENT_FORM_NAME))

    const newTalent = {
      ...json.entity,
      key: json.entity.id,
      roles: json.entity.commonRole,
      characters: ''
    }

    yield put.resolve(arrayPush(parentFormName, 'talents', newTalent))
  } catch (err) {
    console.error('createTalentForEvent error', err)

    if (err.statusCode === 400) {
      yield put.resolve(
        addNotification({
          type: 'Error',
          message: 'The talent already exists.'
        })
      )
    }

    yield call(submitErrorHandler, err, CREATE_TALENT_FORM_NAME)
  }
}

export default [
  takeLatest(types.GET_ENTITY, getEntity),
  takeLatest(types.SAVE_ENTITY, saveEntity),
  takeLatest(types.GET_ENTITY_FOR_EDIT, getEntityForEdit),
  takeLatest(types.GET_SUB_ENTITY, getSubEntity),
  takeLatest(types.AUTOCOMPLETE_SEARCH, autocompleteSearch),
  takeLatest(types.CREATE_TALENT_FOR_EVENT, createTalentForEvent),
  takeLatest(types.GET_EVENT_AS_COPY, getEventAsCopy)
]
