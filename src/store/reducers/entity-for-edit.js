import { handleActions } from 'redux-actions'
import RichTextEditor from 'react-rte'

import * as mappingsLib from '_src/lib/mappings'
import * as entityConstants from '_src/constants/entity'
import { types } from '_src/store/actions/entity'
import * as talentConstants from '_src/constants/talent'
import * as locationConstants from '_src/constants/location'

export const module = 'entityForEdit'

const initialState = {
  entityId: null,
  entity: null,
  getInProgress: false,
  getFailed: false
}

export const reducer = handleActions(
  {
    [types.RESET_ENTITY_FOR_EDIT]: (state, action) => ({
      ...initialState,
      entity: getEntityDefaultValues(action.payload.entityType)
    }),
    [types.GET_ENTITY_FOR_EDIT_STARTED]: (state, action) => ({
      ...initialState,
      entityId: action.payload.id,
      entity: null,
      getInProgress: true,
      getFailed: false
    }),
    [types.GET_ENTITY_FOR_EDIT_SUCCEEDED]: (state, action) => ({
      ...state,
      getInProgress: false,
      getFailed: false,
      entity: getMappingFunc(action.payload.entity.entityType)(
        action.payload.entity
      )
    }),
    [types.GET_ENTITY_FOR_EDIT_FAILED]: (state, action) => ({
      ...initialState,
      getFailed: true
    })
  },
  initialState
)

export const selectors = {
  entityForEdit: state => state.entity,
  entityForEditId: state => state.entityId,
  gettingEntityForEdit: state => state.getInProgress,
  failedToGetEntityForEdit: state => state.getFailed
}

function getMappingFunc (entityType) {
  switch (entityType) {
    case entityConstants.ENTITY_TYPE_TALENT:
      return mappingsLib.mapTalentFromServer
    case entityConstants.ENTITY_TYPE_VENUE:
      return mappingsLib.mapVenueFromServer
    case entityConstants.ENTITY_TYPE_EVENT:
      return mappingsLib.mapEventFromServer
    case entityConstants.ENTITY_TYPE_EVENT_SERIES:
      return mappingsLib.mapEventSeriesFromServer
    default:
      throw new Error(`entityType ${entityType} not supported`)
  }
}

function getEntityDefaultValues (entityType) {
  switch (entityType) {
    case entityConstants.ENTITY_TYPE_TALENT:
      return {
        id: null,
        status: entityConstants.ACTIVE_STATUS,
        validStatuses: [entityConstants.ACTIVE_STATUS],
        firstNames: '',
        lastName: '',
        talentType: talentConstants.TALENT_TYPE_INDIVIDUAL,
        commonRole: '',
        description: RichTextEditor.createEmptyValue(),
        links: [],
        images: [],
        currentEvents: [],
        futureEvents: [],
        weSay: '',
        version: 0,
        createdDate: null
      }
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
        defaultCenter: {
          lat: locationConstants.LONDON_LAT,
          lng: locationConstants.LONDON_LNG
        },
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
