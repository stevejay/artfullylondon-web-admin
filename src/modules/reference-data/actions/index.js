export const types = {
  FETCH_REFERENCE_DATA: 'reference-data/FETCH_REFERENCE_DATA',
  FETCH_REFERENCE_DATA_SUCCEEDED: 'reference-data/FETCH_REFERENCE_DATA_SUCCEEDED'
}

export const fetchReferenceData = () => ({
  type: types.FETCH_REFERENCE_DATA
})

export const fetchReferenceDataSucceeded = payload => ({
  type: types.FETCH_REFERENCE_DATA_SUCCEEDED,
  payload
})
