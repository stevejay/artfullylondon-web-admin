import PropTypes from 'prop-types'

export const POINT_SHAPE = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
})

const londonLatRange = 0.3

export const LONDON_LAT = 51.507398
export const MIN_LONDON_LAT = LONDON_LAT - londonLatRange
export const MAX_LONDON_LAT = LONDON_LAT + londonLatRange

const londonLngRange = 0.6

export const LONDON_LNG = -0.127675
export const MIN_LONDON_LNG = LONDON_LNG - londonLngRange
export const MAX_LONDON_LNG = LONDON_LNG + londonLngRange
