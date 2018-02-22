import { handleActions } from 'redux-actions'

import { types } from '../actions'
import * as entityFactory from '_src/domain/entity-factory'

const initialState = {
  entityId: null,
  entity: null,
  getInProgress: false,
  getFailed: false
}

export const reducer = handleActions(
  {
    [types.CLEAR_ENTITY]: () => initialState,
    [types.RESET_ENTITY_FOR_CREATE]: (state, action) => ({
      ...initialState,
      entity: entityFactory.createEntity(action.payload.entityType)
    }),
    [types.GET_ENTITY_STARTED]: (state, action) => ({
      ...state,
      entityId: action.payload.id,
      entity: null,
      getInProgress: true,
      getFailed: false
    }),
    [types.GET_ENTITY_SUCCEEDED]: (state, action) => ({
      ...state,
      getInProgress: false,
      entity: entityFactory.createEntity(
        action.payload.entityType,
        action.payload.entity
      )
    }),
    [types.GET_ENTITY_FAILED]: (state, action) => ({
      ...initialState,
      getFailed: true
    })
  },
  initialState
)

export const selectors = {
  entity: state => state.entity,
  entityId: state => state.entityId,
  gettingEntity: (state, expectedEntityType) =>
    state.getInProgress ||
    !state.entity ||
    state.entity.entityType !== expectedEntityType ||
    (state.entityId && state.entityId !== state.entity.id),
  failedToGetEntity: state => state.getFailed
}

// TODO delete the following when I can:

// case entityType.EVENT:
//   return {
//     id: null,
//     status: entityConstants.ACTIVE_STATUS,
//     validStatuses: [entityConstants.ACTIVE_STATUS],
//     name: '',
//     eventType: '',
//     dateFrom: null,
//     dateTo: null,
//     costType: '',
//     summary: '',
//     description: RichTextEditor.createEmptyValue(),
//     descriptionCredit: '',
//     links: [],
//     costFrom: '',
//     costTo: '',
//     bookingType: '',
//     bookingOpens: null,
//     venue: {},
//     venueGuidance: '',
//     eventSeries: {},
//     duration: '',
//     weSay: '',
//     rating: '3',
//     minAge: '',
//     useVenueOpeningTimes: false,
//     openingTimes: [],
//     additionalOpeningTimes: [],
//     specialOpeningTimes: [],
//     openingTimesClosures: [],
//     performances: [],
//     additionalPerformances: [],
//     specialPerformances: [],
//     performancesClosures: [],
//     talents: [],
//     mediumTags: [],
//     styleTags: [],
//     audienceTags: [],
//     geoTags: [],
//     images: [],
//     version: 0,
//     createdDate: null
//   }
