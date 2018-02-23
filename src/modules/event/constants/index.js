import eventType from '_src/domain/types/event-type'
import bookingType from '_src/domain/types/booking-type'
import costType from '_src/domain/types/cost-type'
import occurrenceType from '_src/domain/types/occurrence-type'

export const EDIT_EVENT_BASICS_FORM_NAME = 'EditEventBasics'
export const EDIT_EVENT_IMAGES_FORM_NAME = 'EditEventImages'
export const EDIT_EVENT_TAGS_FORM_NAME = 'EditEventTags'
export const EDIT_EVENT_TALENTS_FORM_NAME = 'EditEventTalents'
export const EDIT_EVENT_TIMES_FORM_NAME = 'EditEventTimes'

export const CREATE_TALENT_FORM_NAME = 'CreateTalent'
export const TALENT_MATCHES_FOUND_FORM_NAME = 'TalentMatchesFound'

export const EVENT_TYPE_DROPDOWN_OPTIONS = [
  { value: eventType.PERFORMANCE, label: eventType.PERFORMANCE },
  { value: eventType.EXHIBITION, label: eventType.EXHIBITION }
]

export const COST_TYPE_DROPDOWN_OPTIONS = [
  { value: costType.FREE, label: costType.FREE },
  { value: costType.PAID, label: costType.PAID },
  { value: costType.UNKNOWN, label: costType.UNKNOWN }
]

export const BOOKING_TYPE_DROPDOWN_OPTIONS = [
  { value: bookingType.NOT_REQUIRED, label: 'Not Required' },
  { value: bookingType.REQUIRED, label: 'Required' },
  {
    value: bookingType.REQUIRED_FOR_NON_MEMBERS,
    label: 'Required for Non-Members'
  }
]

export const PERFORMANCE_OCCURRENCE_TYPE_DROPDOWN_OPTIONS = [
  { value: occurrenceType.BOUNDED, label: occurrenceType.BOUNDED },
  { value: occurrenceType.CONTINUOUS, label: occurrenceType.CONTINUOUS },
  { value: occurrenceType.ONETIME, label: 'One-time' }
]

export const EXHIBITION_OCCURRENCE_TYPE_DROPDOWN_OPTIONS = [
  { value: occurrenceType.BOUNDED, label: occurrenceType.BOUNDED },
  { value: occurrenceType.CONTINUOUS, label: occurrenceType.CONTINUOUS }
]

export const RATING_DROPDOWN_OPTIONS = [
  { value: '1', label: 'One star' },
  { value: '2', label: 'Two stars' },
  { value: '3', label: 'Three stars' },
  { value: '4', label: 'Four stars' },
  { value: '5', label: 'Five stars' }
]

export const DURATION_DROPDOWN_OPTIONS = [
  { value: '00:15', label: '15 mins' },
  { value: '00:30', label: '30 mins' },
  { value: '00:45', label: '45 mins' },
  { value: '01:00', label: '1 hour' },
  { value: '01:15', label: '1 hour 15 mins' },
  { value: '01:20', label: '1 hour 20 mins' },
  { value: '01:30', label: '1 hour 30 mins' },
  { value: '01:40', label: '1 hour 40 mins' },
  { value: '01:45', label: '1 hour 45 mins' },
  { value: '02:00', label: '2 hours' },
  { value: '02:15', label: '2 hours 15 mins' },
  { value: '02:20', label: '2 hours 20 mins' },
  { value: '02:30', label: '2 hours 30 mins' },
  { value: '02:40', label: '2 hours 40 mins' },
  { value: '02:45', label: '2 hours 45 mins' },
  { value: '03:00', label: '3 hours' },
  { value: '03:15', label: '3 hours 15 mins' },
  { value: '03:20', label: '3 hours 20 mins' },
  { value: '03:30', label: '3 hours 30 mins' },
  { value: '03:40', label: '3 hours 40 mins' },
  { value: '03:45', label: '3 hours 45 mins' },
  { value: '04:00', label: '4 hours' },
  { value: '05:00', label: '5 hours' },
  { value: '06:00', label: '6 hours' },
  { value: '07:00', label: '7 hours' },
  { value: '08:00', label: '8 hours' }
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
