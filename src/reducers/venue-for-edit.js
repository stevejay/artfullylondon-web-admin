import { handleActions } from 'redux-actions'
import RichTextEditor from 'react-rte'
import { ENTITY_TYPE_VENUE } from '_src/constants/entity'
import { LONDON_LAT, LONDON_LNG } from '_src/constants/location'
import * as mappings from '_src/lib/mappings'
import * as entityConstants from '_src/constants/entity'

const initialState = {
  entityId: null,
  entity: {
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
      lat: LONDON_LAT,
      lng: LONDON_LNG
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
  },
  getInProgress: false,
  getFailed: false,
  getFailedStatusCode: null
}

export default handleActions(
  {
    [entityConstants.RESET_ENTITY_FOR_EDIT]: (state, action) => {
      if (action.payload.entityType !== ENTITY_TYPE_VENUE) {
        return state
      }

      return initialState
    },
    [entityConstants.GET_ENTITY_FOR_EDIT_STARTED]: (state, action) => {
      if (action.payload.entityType !== ENTITY_TYPE_VENUE) {
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
      if (action.payload.entityType !== ENTITY_TYPE_VENUE) {
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
        entity: mappings.mapVenueFromServer(action.payload.entity)
      }
    },
    [entityConstants.GET_ENTITY_FOR_EDIT_FAILED]: (state, action) => {
      if (action.payload.entityType !== ENTITY_TYPE_VENUE) {
        return state
      }

      return {
        ...initialState,
        getFailed: true,
        getFailedStatusCode: action.payload.statusCode
      }
    }
  },
  initialState
)
