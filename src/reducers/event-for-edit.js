import { handleActions } from 'redux-actions'
import RichTextEditor from 'react-rte'
import {
  ENTITY_TYPE_EVENT,
  ENTITY_TYPE_EVENT_SERIES,
  ENTITY_TYPE_VENUE,
  ENTITY_TYPE_TALENT
} from '_src/constants/entity'
import * as mappings from '_src/lib/mappings'
import * as entityConstants from '_src/constants/entity'

const initialState = {
  entityId: null,
  entity: {
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
  },
  getInProgress: false,
  getFailed: false,
  getFailedStatusCode: null,
  getEventSeriesSubEntityInProgress: false,
  getVenueSubEntityInProgress: false,
  // getTalentSubEntityInProgress: false,
  venueAutocompleteItems: [],
  eventSeriesAutocompleteItems: [],
  talentAutocompleteItems: []
}

export default handleActions(
  {
    [entityConstants.RESET_ENTITY_FOR_EDIT]: (state, action) => {
      if (action.payload.entityType !== ENTITY_TYPE_EVENT) {
        return state
      }

      if (state.getInProgress) {
        // TODO See if this is okay.
        return state
      }

      return initialState
    },
    [entityConstants.GET_ENTITY_FOR_EDIT_STARTED]: (state, action) => {
      if (action.payload.entityType !== ENTITY_TYPE_EVENT) {
        return state
      }

      return {
        ...initialState,
        entityId: action.payload.id,
        getInProgress: true,
        getFailed: false,
        getFailedStatusCode: null
      }
    },
    [entityConstants.GET_ENTITY_FOR_EDIT_SUCCEEDED]: (state, action) => {
      if (action.payload.entityType !== ENTITY_TYPE_EVENT) {
        return state
      }

      if (action.payload.entity.id !== state.entityId) {
        return state
      }

      return {
        ...state,
        getInProgress: false,
        getFailed: false,
        getFailedStatusCode: null,
        entity: mappings.mapEventFromServer(action.payload.entity),
        venueAutocompleteItems: [],
        eventSeriesAutocompleteItems: [],
        talentAutocompleteItems: [],
        getEventSeriesSubEntityInProgress: false,
        getVenueSubEntityInProgress: false
        // getTalentSubEntityInProgress: false
      }
    },
    [entityConstants.GET_ENTITY_FOR_EDIT_FAILED]: (state, action) => {
      if (action.payload.entityType !== ENTITY_TYPE_EVENT) {
        return state
      }

      return {
        ...initialState,
        getFailed: true,
        getFailedStatusCode: action.payload.statusCode
      }
    },
    [entityConstants.GET_EVENT_AS_COPY_STARTED]: () => {
      return {
        ...initialState,
        getInProgress: true,
        getFailed: false,
        getFailedStatusCode: null
      }
    },
    [entityConstants.GET_EVENT_AS_COPY_SUCCEEDED]: (state, action) => {
      const entity = mappings.mapEventFromServer(action.payload.entity)

      const resets = {
        id: null,
        status: entityConstants.ACTIVE_STATUS,
        validStatuses: [entityConstants.ACTIVE_STATUS],
        dateFrom: null,
        dateTo: null,
        bookingOpens: null,
        links: [],
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
        version: 0,
        createdDate: null
      }

      return {
        ...state,
        entity: Object.assign({}, entity, resets),
        getInProgress: false,
        getFailed: false,
        getFailedStatusCode: null
      }
    },
    [entityConstants.GET_EVENT_AS_COPY_FAILED]: (state, action) => {
      return {
        ...state,
        getFailed: true,
        getFailedStatusCode: action.payload.statusCode
      }
    },
    [entityConstants.UPDATE_ENTITY_FOR_EDIT]: (state, action) => {
      if (action.payload.entityType !== ENTITY_TYPE_EVENT) {
        return state
      }

      return {
        ...state,
        entity: {
          ...state.entity,
          ...action.payload.values
        }
      }
    },
    [entityConstants.AUTOCOMPLETE_SEARCH_SUCCEEDED]: (state, action) => {
      const { entityType } = action.payload.params

      if (entityType === ENTITY_TYPE_VENUE) {
        return {
          ...state,
          venueAutocompleteItems: action.payload.items,
          eventSeriesAutocompleteItems: [],
          talentAutocompleteItems: []
        }
      } else if (entityType === ENTITY_TYPE_TALENT) {
        return {
          ...state,
          venueAutocompleteItems: [],
          eventSeriesAutocompleteItems: [],
          talentAutocompleteItems: action.payload.items
        }
      } else {
        return {
          ...state,
          venueAutocompleteItems: [],
          eventSeriesAutocompleteItems: action.payload.items,
          talentAutocompleteItems: []
        }
      }
    },
    [entityConstants.CLEAR_AUTOCOMPLETE]: state => {
      return {
        ...state,
        venueAutocompleteItems: [],
        eventSeriesAutocompleteItems: [],
        talentAutocompleteItems: []
      }
    },
    [entityConstants.GET_SUB_ENTITY_STARTED]: (state, action) => {
      const { entityType, subEntityType } = action.payload

      if (entityType !== ENTITY_TYPE_EVENT) {
        return state
      }

      switch (subEntityType) {
        case ENTITY_TYPE_EVENT_SERIES:
          return {
            ...state,
            getEventSeriesSubEntityInProgress: true
          }
        case ENTITY_TYPE_VENUE:
          return {
            ...state,
            getVenueSubEntityInProgress: true
          }
        // case ENTITY_TYPE_TALENT:
        //     return {
        //         ...state,
        //         getTalentSubEntityInProgress: true
        //     };
        default:
          throw new Error(`subEntityType out of range: ${subEntityType}`)
      }
    },
    [entityConstants.GET_SUB_ENTITY_FINISHED]: (state, action) => {
      const { entityType, subEntityType } = action.payload

      if (entityType !== ENTITY_TYPE_EVENT) {
        return state
      }

      switch (subEntityType) {
        case ENTITY_TYPE_EVENT_SERIES:
          return {
            ...state,
            getEventSeriesSubEntityInProgress: false
          }
        case ENTITY_TYPE_VENUE:
          return {
            ...state,
            getVenueSubEntityInProgress: false
          }
        // case ENTITY_TYPE_TALENT:
        //     return {
        //         ...state,
        //         getTalentSubEntityInProgress: false
        //     };
        default:
          throw new Error(`subEntityType out of range: ${subEntityType}`)
      }
    }
  },
  initialState
)
