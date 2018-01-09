export const EVENT_TYPE_PERFORMANCE = 'Performance'
export const EVENT_TYPE_EXHIBITION = 'Exhibition'

export const EVENT_TYPE_DROPDOWN_OPTIONS = [
  { value: EVENT_TYPE_PERFORMANCE, label: 'Performance' },
  { value: EVENT_TYPE_EXHIBITION, label: 'Exhibition' }
]

export const ALLOWED_EVENT_TYPES = [
  EVENT_TYPE_PERFORMANCE,
  EVENT_TYPE_EXHIBITION
]

export const COST_TYPE_FREE = 'Free'
export const COST_TYPE_PAID = 'Paid'
export const COST_TYPE_UNKNOWN = 'Unknown'

export const ALLOWED_COST_TYPES = [
  COST_TYPE_FREE,
  COST_TYPE_PAID,
  COST_TYPE_UNKNOWN
]

export const COST_TYPE_DROPDOWN_OPTIONS = [
  { value: COST_TYPE_FREE, label: 'Free' },
  { value: COST_TYPE_PAID, label: 'Paid' },
  { value: COST_TYPE_UNKNOWN, label: 'Unknown' }
]

export const BOOKING_TYPE_NOT_REQUIRED = 'NotRequired'
export const BOOKING_TYPE_REQUIRED = 'Required'
export const BOOKING_TYPE_REQUIRED_FOR_NON_MEMBERS = 'RequiredForNonMembers'

export const BOOKING_TYPE_DROPDOWN_OPTIONS = [
  { value: BOOKING_TYPE_NOT_REQUIRED, label: 'Not Required' },
  { value: BOOKING_TYPE_REQUIRED, label: 'Required' },
  {
    value: BOOKING_TYPE_REQUIRED_FOR_NON_MEMBERS,
    label: 'Required for Non-Members'
  }
]

export const ALLOWED_BOOKING_TYPES = [
  BOOKING_TYPE_NOT_REQUIRED,
  BOOKING_TYPE_REQUIRED,
  BOOKING_TYPE_REQUIRED_FOR_NON_MEMBERS
]

export const OCCURRENCE_TYPE_BOUNDED = 'Bounded'
export const OCCURRENCE_TYPE_CONTINUOUS = 'Continuous'
export const OCCURRENCE_TYPE_ONETIME = 'OneTime'

export const ALLOWED_PERFORMANCE_OCCURRENCE_TYPES = [
  OCCURRENCE_TYPE_BOUNDED,
  OCCURRENCE_TYPE_CONTINUOUS,
  OCCURRENCE_TYPE_ONETIME
]

export const ALLOWED_EXHIBITION_OCCURRENCE_TYPES = [
  OCCURRENCE_TYPE_BOUNDED,
  OCCURRENCE_TYPE_CONTINUOUS
]

export const PERFORMANCE_OCCURRENCE_TYPE_DROPDOWN_OPTIONS = [
  { value: OCCURRENCE_TYPE_BOUNDED, label: OCCURRENCE_TYPE_BOUNDED },
  { value: OCCURRENCE_TYPE_CONTINUOUS, label: OCCURRENCE_TYPE_CONTINUOUS },
  { value: OCCURRENCE_TYPE_ONETIME, label: 'One-time' }
]

export const EXHIBITION_OCCURRENCE_TYPE_DROPDOWN_OPTIONS = [
  { value: OCCURRENCE_TYPE_BOUNDED, label: OCCURRENCE_TYPE_BOUNDED },
  { value: OCCURRENCE_TYPE_CONTINUOUS, label: OCCURRENCE_TYPE_CONTINUOUS }
]

export const RATING_DROPDOWN_OPTIONS = [
  { value: '1', label: 'One star' },
  { value: '2', label: 'Two stars' },
  { value: '3', label: 'Three stars' },
  { value: '4', label: 'Four stars' },
  { value: '5', label: 'Five stars' }
]

export const MIN_AGE_DROPDOWN_OPTIONS = [
  { value: '', label: 'None' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
  { value: '6', label: '6+' },
  { value: '7', label: '7+' },
  { value: '8', label: '8+' },
  { value: '9', label: '9+' },
  { value: '10', label: '10+' },
  { value: '11', label: '11+' },
  { value: '12', label: '12+' },
  { value: '13', label: '13+' },
  { value: '14', label: '14+' },
  { value: '15', label: '15+' },
  { value: '16', label: '16+' },
  { value: '17', label: '17+' },
  { value: '18', label: '18+' },
  { value: '21', label: '21+' }
]
