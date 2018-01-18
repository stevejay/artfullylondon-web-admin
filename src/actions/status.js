import { createAction } from 'redux-actions'
import * as statusActionTypes from '_src/constants/action/status'

export const getEntityCounts = createAction(statusActionTypes.GET_ENTITY_COUNTS)
