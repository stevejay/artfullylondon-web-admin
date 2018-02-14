import { handleActions } from 'redux-actions'
import RichTextEditor from 'react-rte'

import { FullEvent } from '_src/entities/event'
import { FullEventSeries } from '_src/entities/event-series'
import { FullTalent } from '_src/entities/talent'
import { FullVenue } from '_src/entities/venue'
import { types } from '_src/modules/entity/actions'
import * as entityConstants from '_src/constants/entity'
import { DEFAULT_MAP_CENTER } from '_src/modules/location'

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
      entity: createEntity(action.payload.entityType)
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
      entity: createEntity(action.payload.entityType, action.payload.entity)
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
  gettingEntity: state => state.getInProgress,
  failedToGetEntity: state => state.getFailed
}

function createEntity (entityType, entity = null) {
  switch (entityType) {
    case entityConstants.ENTITY_TYPE_EVENT:
      return new FullEvent(entity)
    case entityConstants.ENTITY_TYPE_EVENT_SERIES:
      return new FullEventSeries(entity)
    case entityConstants.ENTITY_TYPE_TALENT:
      return new FullTalent(entity)
    case entityConstants.ENTITY_TYPE_VENUE:
      return new FullVenue(entity)
    default:
      throw new Error(`entityType ${entityType} not supported`)
  }
}

// TODO rip all this stuff out and put it in the domain!!
function getEntityDefaultValues (entityType) {
  switch (entityType) {
    // case entityConstants.ENTITY_TYPE_TALENT:
    //   return {
    //     id: null,
    //     status: entityConstants.ACTIVE_STATUS,
    //     validStatuses: [entityConstants.ACTIVE_STATUS],
    //     firstNames: '',
    //     lastName: '',
    //     talentType: talentConstants.TALENT_TYPE_INDIVIDUAL,
    //     commonRole: '',
    //     description: RichTextEditor.createEmptyValue(),
    //     links: [],
    //     images: [],
    //     currentEvents: [],
    //     futureEvents: [],
    //     weSay: '',
    //     version: 0,
    //     createdDate: null
    //   }
    case entityConstants.ENTITY_TYPE_VENUE:
      return {
        id: null,
        status: entityConstants.ACTIVE_STATUS,
        validStatuses: [entityConstants.ACTIVE_STATUS],
        name: '',
        venueType: '',
        address: '',
        pin: {
          lat: null,
          lng: null
        },
        defaultCenter: DEFAULT_MAP_CENTER,
        postcode: '',
        email: '',
        telephone: '',
        description: RichTextEditor.createEmptyValue(),
        wheelchairAccessType: '',
        disabledBathroomType: '',
        hearingFacilitiesType: '',
        hasPermanentCollection: false,
        openingTimes: [],
        additionalOpeningTimes: [],
        openingTimesClosures: [],
        namedClosures: '',
        links: [],
        images: [],
        weSay: '',
        notes: '',
        version: 0,
        createdDate: null
      }
    case entityConstants.ENTITY_TYPE_EVENT:
      return {
        id: null,
        status: entityConstants.ACTIVE_STATUS,
        validStatuses: [entityConstants.ACTIVE_STATUS],
        name: '',
        eventType: '',
        dateFrom: null,
        dateTo: null,
        costType: '',
        summary: '',
        description: RichTextEditor.createEmptyValue(),
        descriptionCredit: '',
        links: [],
        costFrom: '',
        costTo: '',
        bookingType: '',
        bookingOpens: null,
        venue: {},
        venueGuidance: '',
        eventSeries: {},
        duration: '',
        weSay: '',
        rating: '3',
        minAge: '',
        useVenueOpeningTimes: false,
        openingTimes: [],
        additionalOpeningTimes: [],
        specialOpeningTimes: [],
        openingTimesClosures: [],
        performances: [],
        additionalPerformances: [],
        specialPerformances: [],
        performancesClosures: [],
        talents: [],
        mediumTags: [],
        styleTags: [],
        audienceTags: [],
        geoTags: [],
        images: [],
        version: 0,
        createdDate: null
      }
    case entityConstants.ENTITY_TYPE_EVENT_SERIES:
      return {
        id: null,
        status: entityConstants.ACTIVE_STATUS,
        validStatuses: [entityConstants.ACTIVE_STATUS],
        name: '',
        eventSeriesType: '',
        occurrence: '',
        summary: '',
        description: RichTextEditor.createEmptyValue(),
        images: [],
        links: [],
        descriptionCredit: '',
        weSay: '',
        version: 0,
        createdDate: null
      }
    default:
      throw new Error(`entityType ${entityType} not supported`)
  }
}
