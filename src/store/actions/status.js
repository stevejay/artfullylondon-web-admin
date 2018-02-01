export const types = {
  GET_ENTITY_COUNTS: 'status/GET_ENTITY_COUNTS',
  GET_ENTITY_COUNTS_STARTED: 'status/GET_ENTITY_COUNTS_STARTED',
  GET_ENTITY_COUNTS_SUCCEEDED: 'status/GET_ENTITY_COUNTS_SUCCEEDED',
  GET_ENTITY_COUNTS_FAILED: 'status/GET_ENTITY_COUNTS_FAILED'
}

export const getEntityCounts = () => ({
  type: types.GET_ENTITY_COUNTS
})

export const getEntityCountsStarted = () => ({
  type: types.GET_ENTITY_COUNTS_STARTED
})

export const getEntityCountsSucceeded = payload => ({
  type: types.GET_ENTITY_COUNTS_SUCCEEDED,
  payload
})

export const getEntityCountsFailed = () => ({
  type: types.GET_ENTITY_COUNTS_FAILED
})
