import { handleActions } from 'redux-actions'
import RichTextEditor from 'react-rte'
import * as mappings from '_src/lib/mappings'
import * as entityConstants from '_src/constants/entity'
import { TALENT_TYPE_INDIVIDUAL } from '_src/constants/talent'

const initialState = {
  entityId: null,
  entity: {
    id: null,
    status: entityConstants.ACTIVE_STATUS,
    validStatuses: [entityConstants.ACTIVE_STATUS],
    firstNames: '',
    lastName: '',
    talentType: TALENT_TYPE_INDIVIDUAL,
    commonRole: '',
    description: RichTextEditor.createEmptyValue(),
    links: [],
    images: [],
    currentEvents: [],
    futureEvents: [],
    weSay: '',
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
      if (action.payload.entityType !== entityConstants.ENTITY_TYPE_TALENT) {
        return state
      }

      return initialState
    },
    [entityConstants.GET_ENTITY_FOR_EDIT_STARTED]: (state, action) => {
      if (action.payload.entityType !== entityConstants.ENTITY_TYPE_TALENT) {
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
      if (action.payload.entityType !== entityConstants.ENTITY_TYPE_TALENT) {
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
        entity: mappings.mapTalentFromServer(action.payload.entity)
      }
    },
    [entityConstants.GET_ENTITY_FOR_EDIT_FAILED]: (state, action) => {
      if (action.payload.entityType !== entityConstants.ENTITY_TYPE_TALENT) {
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
