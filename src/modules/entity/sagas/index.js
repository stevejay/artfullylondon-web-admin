// import { delay } from 'redux-saga'
// import _ from 'lodash'
import { call, put, takeLatest } from 'redux-saga/effects'
// import { startSubmit, stopSubmit, reset, arrayPush, change } from 'redux-form'
import { startSubmit, stopSubmit } from 'redux-form'
import { get, put as httpPut, post } from '_src/lib/fetch'
import log from 'loglevel'

import normalise from '_src/lib/normalise'
import history from '_src/history'
import * as sagaLib from '_src/lib/saga'
import * as validationLib from '_src/lib/validation'
import * as entityActions from '../actions'
import { getAuthTokenForCurrentUser } from '_src/modules/user'
import { actions as notificationActions } from '_src/modules/notification'

export function * getEntity (action) {
  const { entityType, id } = action.payload

  try {
    yield put(entityActions.clearEntity())
    yield put(entityActions.getEntityStarted(id))

    const token = yield call(getAuthTokenForCurrentUser)
    const url = `${process.env.WEBSITE_API_HOST_URL}/event-service/admin/edit/${entityType}/${id}`
    const json = yield call(get, url, token)

    yield put(entityActions.getEntitySucceeded(entityType, json.entity))
  } catch (err) {
    yield call(log.error, err)
    yield put(entityActions.getEntityFailed())
  }
}

export function * saveEntity ({
  payload: {
    entityType,
    values: payloadValues,
    isEdit,
    formName,
    normaliser,
    constraint,
    mapper
  }
}) {
  try {
    yield put(startSubmit(formName))
    const values = yield call(normalise, payloadValues, normaliser)
    yield call(validationLib.validate, values, constraint)

    const token = yield call(getAuthTokenForCurrentUser)
    let json = null

    if (isEdit) {
      const url = `${process.env.WEBSITE_API_HOST_URL}/event-service/admin/${entityType}/${values.id}`
      json = yield call(httpPut, url, mapper(values), token)
    } else {
      const url = `${process.env.WEBSITE_API_HOST_URL}/event-service/admin/${entityType}`
      json = yield call(post, url, mapper(values), token)
    }

    yield put(stopSubmit(formName))
    yield call(history.push, `/${entityType}/${json.entity.id}`)
  } catch (err) {
    yield call(log.error, err)

    yield put(
      notificationActions.addErrorNotification(
        'Save Failed',
        // message: 'This form has errors. Please correct them and try again.'
        err.message
      )
    )

    yield call(sagaLib.submitErrorHandler, err, formName)
  }
}

// TODO delete all the below when I can.

// function _getConstraintForEntityType (entityType) {
//   switch (entityType) {
//     case entityConstants.ENTITY_TYPE_TALENT:
//       return talentConstraint
//     case entityConstants.ENTITY_TYPE_VENUE:
//       return venueConstraint
//     case entityConstants.ENTITY_TYPE_EVENT:
//       return eventConstraints.BASIC_CONSTRAINT
//     case entityConstants.ENTITY_TYPE_EVENT_SERIES:
//       return eventSeriesConstraint
//     default:
//       throw new Error(`entityType out of range: ${entityType}`)
//   }
// }

// function _getNormaliserForEntityType (entityType) {
//   switch (entityType) {
//     case entityConstants.ENTITY_TYPE_TALENT:
//       return talentNormaliser
//     case entityConstants.ENTITY_TYPE_VENUE:
//       return venueNormaliser
//     case entityConstants.ENTITY_TYPE_EVENT:
//       return eventNormalisers.basicNormaliser
//     case entityConstants.ENTITY_TYPE_EVENT_SERIES:
//       return eventSeriesNormaliser
//     default:
//       throw new Error(`entityType out of range: ${entityType}`)
//   }
// }

// function _getMapperForEntityType (entityType) {
//   switch (entityType) {
//     case entityConstants.ENTITY_TYPE_TALENT:
//       return mappingsLib.mapTalentToServer
//     case entityConstants.ENTITY_TYPE_VENUE:
//       return mappingsLib.mapVenueToServer
//     case entityConstants.ENTITY_TYPE_EVENT:
//       return mappingsLib.mapEventToServer
//     case entityConstants.ENTITY_TYPE_EVENT_SERIES:
//       return mappingsLib.mapEventSeriesToServer
//     default:
//       throw new Error(`entityType out of range: ${entityType}`)
//   }
// }

// function _getFormNameForEntityType (entityType) {
//   switch (entityType) {
//     case entityConstants.ENTITY_TYPE_TALENT:
//       return formConstants.EDIT_TALENT_FORM_NAME
//     case entityConstants.ENTITY_TYPE_VENUE:
//       return formConstants.EDIT_VENUE_FORM_NAME
//     case entityConstants.ENTITY_TYPE_EVENT:
//       return formConstants.EDIT_EVENT_IMAGES_FORM_NAME
//     case entityConstants.ENTITY_TYPE_EVENT_SERIES:
//       return formConstants.EDIT_EVENT_SERIES_FORM_NAME
//     default:
//       throw new Error(`entityType out of range: ${entityType}`)
//   }
// }

// function * getEventAsCopy (action) {
//   const { id } = action.payload

//   try {
//     yield put({ type: entityActionTypes.GET_EVENT_AS_COPY_STARTED })

//     const token = yield call(getAuthTokenForCurrentUser)
//     const url = `${process.env.WEBSITE_API_HOST_URL}/event-service/admin/edit/event/${id}`
//     const json = yield call(get, url, token)

//     yield put({
//       type: entityActionTypes.GET_EVENT_AS_COPY_SUCCEEDED,
//       payload: { entity: json.entity }
//     })
//   } catch (err) {
//     yield call(log.error, err)

//     yield put({
//       type: entityActionTypes.GET_EVENT_AS_COPY_FAILED,
//       payload: { statusCode: err.statusCode || 500 }
//     })
//   }
// }

// function * getSubEntity (action) {
//   const { entityType, subEntityType, id, parentFormName } = action.payload

//   try {
//     yield put({
//       type: entityActionTypes.GET_SUB_ENTITY_STARTED,
//       payload: { entityType, subEntityType }
//     })

//     const token = yield call(getAuthTokenForCurrentUser)
//     const url = `${process.env.WEBSITE_API_HOST_URL}/event-service/admin/edit/${subEntityType}/${id}`
//     const json = yield call(get, url, token)

//     yield put(change(parentFormName, _.camelCase(subEntityType), json.entity))
//   } catch (err) {
//     yield call(log.error, err)

//     yield put(
//       notificationActions.addNotification(
//         notificationConstants.NOTIFICATION_TYPE_ERROR,
//         'Get Failed',
//         'The entity could not be read.'
//       )
//     )
//   } finally {
//     yield put({
//       type: entityActionTypes.GET_SUB_ENTITY_FINISHED,
//       payload: { entityType, subEntityType }
//     })
//   }
// }

// function * autocompleteSearch (action) {
//   try {
//     yield call(delay, 300) // debounce
//     const query = normalise(
//       action.payload.query,
//       searchConstants.AUTO_SEARCH_QUERY_NORMALISER
//     )
//     const errors = yield call(
//       validationLib.validate,
//       query,
//       searchConstants.AUTO_SEARCH_QUERY_CONSTRAINT,
//       null,
//       true
//     )

//     if (errors !== null) {
//       yield call(log.error, errors)
//       return
//     }

//     const requestUrl = searchLib.createAutocompleteSearchRequestUrl(query)
//     const json = yield call(get, requestUrl)

//     yield put({
//       type: entityActionTypes.AUTOCOMPLETE_SEARCH_SUCCEEDED,
//       payload: json
//     })
//   } catch (err) {
//     yield call(log.error, err)
//   }
// }

// function * createTalentForEvent (action) {
//   const { values, parentFormName, forceCreate } = action.payload

//   try {
//     yield put(startSubmit(formConstants.CREATE_TALENT_FORM_NAME))
//     yield call(validationLib.validate, values, talentConstraint)

//     if (!forceCreate) {
//       const query = {
//         entityType: 'talent',
//         term: `${values.firstNames} ${values.lastName}`,
//         take: 5
//       }

//       const requestUrl = searchLib.createBasicSearchRequestUrl(query)
//       const json = yield call(get, requestUrl)

//       if (json.total > 0) {
//         throw new Error('not implemented')

//         // yield put({
//         //   type: modalTypes.SHOW_MODAL,
//         //   payload: {
//         //     component: TalentMatchesFoundModal,
//         //     componentProps: {
//         //       items: json.items,
//         //       values,
//         //       parentFormName
//         //     }
//         //   }
//         // })

//         yield put(stopSubmit(formConstants.CREATE_TALENT_FORM_NAME))
//       }
//     }

//     const token = yield call(getAuthTokenForCurrentUser)
//     const url = `${process.env.WEBSITE_API_HOST_URL}/event-service/admin/talent`
//     const mappedValues = mappingsLib.mapTalentToServer(values)
//     const json = yield call(post, url, mappedValues, token)

//     yield put(stopSubmit(formConstants.CREATE_TALENT_FORM_NAME))
//     yield put(reset(formConstants.CREATE_TALENT_FORM_NAME))

//     const newTalent = {
//       ...json.entity,
//       key: json.entity.id,
//       roles: json.entity.commonRole,
//       characters: ''
//     }

//     yield put(arrayPush(parentFormName, 'talents', newTalent))
//   } catch (err) {
//     yield call(log.error, err)

//     if (err.statusCode === 400) {
//       yield put(
//         notificationActions.addNotification(
//           notificationConstants.NOTIFICATION_TYPE_ERROR,
//           null,
//           'The talent already exists.'
//         )
//       )
//     }

//     yield call(
//       sagaLib.submitErrorHandler,
//       err,
//       formConstants.CREATE_TALENT_FORM_NAME
//     )
//   }
// }

export default [
  takeLatest(entityActions.types.GET_ENTITY, getEntity),
  takeLatest(entityActions.types.SAVE_ENTITY, saveEntity)
  // takeLatest(entityActionTypes.GET_SUB_ENTITY, getSubEntity),
  // takeLatest(entityActionTypes.AUTOCOMPLETE_SEARCH, autocompleteSearch),
  // takeLatest(entityActionTypes.CREATE_TALENT_FOR_EVENT, createTalentForEvent),
  // takeLatest(entityActionTypes.GET_EVENT_AS_COPY, getEventAsCopy)
]
