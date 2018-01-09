import { createAction } from 'redux-actions'
import * as types from '_src/constants/time'

export const addOpeningTime = createAction(types.ADD_OPENING_TIME)

export const addAdditionalOpeningTime = createAction(
  types.ADD_ADDITIONAL_OPENING_TIME
)

export const addSpecialOpeningTime = createAction(
  types.ADD_SPECIAL_OPENING_TIME
)

export const addOpeningTimeClosure = createAction(
  types.ADD_OPENING_TIME_CLOSURE
)

export const addPerformance = createAction(types.ADD_PERFORMANCE)

export const addAdditionalPerformance = createAction(
  types.ADD_ADDITIONAL_PERFORMANCE
)

export const addSpecialPerformance = createAction(types.ADD_SPECIAL_PERFORMANCE)

export const addPerformanceClosure = createAction(types.ADD_PERFORMANCE_CLOSURE)

export const addTimesRange = createAction(types.ADD_TIMES_RANGE)
