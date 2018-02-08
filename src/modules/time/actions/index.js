export const types = {
  ADD_OPENING_TIME: 'time/ADD_OPENING_TIME',
  ADD_ADDITIONAL_OPENING_TIME: 'time/ADD_ADDITIONAL_OPENING_TIME',
  ADD_SPECIAL_OPENING_TIME: 'time/ADD_SPECIAL_OPENING_TIME',
  ADD_OPENING_TIME_CLOSURE: 'time/ADD_OPENING_TIME_CLOSURE',
  ADD_PERFORMANCE: 'time/ADD_PERFORMANCE',
  ADD_ADDITIONAL_PERFORMANCE: 'time/ADD_ADDITIONAL_PERFORMANCE',
  ADD_SPECIAL_PERFORMANCE: 'time/ADD_SPECIAL_PERFORMANCE',
  ADD_PERFORMANCE_CLOSURE: 'time/ADD_PERFORMANCE_CLOSURE',
  ADD_TIMES_RANGE: 'time/ADD_TIMES_RANGE'
}

export const addOpeningTime = (values, parentFormName) => ({
  type: types.ADD_OPENING_TIME,
  payload: { values, parentFormName }
})

export const addAdditionalOpeningTime = (values, parentFormName) => ({
  type: types.ADD_ADDITIONAL_OPENING_TIME,
  payload: { values, parentFormName }
})

export const addSpecialOpeningTime = (values, parentFormName) => ({
  type: types.ADD_SPECIAL_OPENING_TIME,
  payload: { values, parentFormName }
})

export const addOpeningTimeClosure = (values, parentFormName) => ({
  type: types.ADD_OPENING_TIME_CLOSURE,
  payload: { values, parentFormName }
})

export const addPerformance = (values, parentFormName) => ({
  type: types.ADD_PERFORMANCE,
  payload: { values, parentFormName }
})

export const addAdditionalPerformance = (values, parentFormName) => ({
  type: types.ADD_ADDITIONAL_PERFORMANCE,
  payload: { values, parentFormName }
})

export const addSpecialPerformance = (values, parentFormName) => ({
  type: types.ADD_SPECIAL_PERFORMANCE,
  payload: { values, parentFormName }
})

export const addPerformanceClosure = (values, parentFormName) => ({
  type: types.ADD_PERFORMANCE_CLOSURE,
  payload: { values, parentFormName }
})

export const addTimesRange = (values, parentFormName) => ({
  type: types.ADD_TIMES_RANGE,
  payload: { values, parentFormName }
})
