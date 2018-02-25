import _ from 'lodash'
import { call, put, takeLatest } from 'redux-saga/effects'
import { change } from 'redux-form'
import log from 'loglevel'

import * as sagaLib from '_src/shared/lib/saga'
import * as eventActions from '../actions'
import * as entityFactory from '_src/domain/entity-factory'
import { eventService, tagService } from '_src/modules/api'
import { actions as notificationActions } from '_src/modules/notification'

export function * getSubEntity ({ payload, meta }) {
  const { subEntityType, id, parentFormName } = payload

  try {
    const entity = yield call(eventService.getSummaryEntity, subEntityType, id)
    const result = entityFactory.createSummaryEntity(subEntityType, entity)
    yield put(change(parentFormName, _.camelCase(subEntityType), result))
    yield put(sagaLib.returnAsPromise(null, meta))
  } catch (err) {
    yield call(log.error, err)

    yield put(
      notificationActions.addErrorNotification(
        'Load Failed',
        `Failed to load ${subEntityType} entity`
      )
    )
  }
}

export function * getAllTags () {
  try {
    const tags = yield call(tagService.getAllTags)
    yield put(eventActions.getAllTagsSucceeded(tags))
  } catch (err) {
    yield call(log.error, err)

    yield put(
      notificationActions.addErrorNotification(
        'Load Failed',
        `Failed to load the tags`
      )
    )
  }
}

// TODO Delete when I can:

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
  takeLatest(eventActions.types.GET_SUB_ENTITY, getSubEntity),
  takeLatest(eventActions.types.GET_ALL_TAGS, getAllTags)
  // takeLatest(entityActionTypes.AUTOCOMPLETE_SEARCH, autocompleteSearch),
  // takeLatest(entityActionTypes.CREATE_TALENT_FOR_EVENT, createTalentForEvent),
  // takeLatest(entityActionTypes.GET_EVENT_AS_COPY, getEventAsCopy)
]
