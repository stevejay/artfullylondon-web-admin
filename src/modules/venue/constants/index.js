import * as accessConstants from '_src/constants/access'
import * as venueConstants from '_src/constants/venue'

export const EDIT_VENUE_FORM_NAME = 'EditVenue'

export const HEARING_FACILITIES_TYPE_DROPDOWN_OPTIONS = [
  {
    value: accessConstants.HEARING_FACILITIES_TYPE_NOT_APPLICABLE,
    label: 'Not applicable'
  },
  {
    value: accessConstants.HEARING_FACILITIES_TYPE_HEARING_LOOPS,
    label: 'Hearing loops in all spaces'
  },
  {
    value: accessConstants.HEARING_FACILITIES_TYPE_PARTIAL_HEARING_LOOPS,
    label: 'Hearing loops in some spaces'
  },
  {
    value: accessConstants.HEARING_FACILITIES_TYPE_NO_HEARING_LOOPS,
    label: 'No hearing loops'
  },
  { value: accessConstants.HEARING_FACILITIES_TYPE_UNKNOWN, label: 'Unknown' }
]

export const DISABLED_BATHROOM_TYPE_DROPDOWN_OPTIONS = [
  {
    value: accessConstants.DISABLED_BATHROOM_TYPE_NOT_APPLICABLE,
    label: 'Not applicable'
  },
  { value: accessConstants.DISABLED_BATHROOM_TYPE_PRESENT, label: 'Present' },
  {
    value: accessConstants.DISABLED_BATHROOM_TYPE_NOT_PRESENT,
    label: 'Not present'
  },
  { value: accessConstants.DISABLED_BATHROOM_TYPE_UNKNOWN, label: 'Unknown' }
]

export const WHEELCHAIR_ACCESS_TYPE_DROPDOWN_OPTIONS = [
  {
    value: accessConstants.WHEELCHAIR_ACCESS_TYPE_NOT_APPLICABLE,
    label: 'Not applicable'
  },
  {
    value: accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
    label: 'Access to all spaces'
  },
  {
    value: accessConstants.WHEELCHAIR_ACCESS_TYPE_PARTIAL_ACCESS,
    label: 'Access to some spaces'
  },
  {
    value: accessConstants.WHEELCHAIR_ACCESS_TYPE_NO_ACCESS,
    label: 'No access'
  },
  { value: accessConstants.WHEELCHAIR_ACCESS_TYPE_UNKNOWN, label: 'Unknown' }
]

export const VENUE_TYPE_DROPDOWN_OPTIONS = [
  {
    value: venueConstants.VENUE_TYPE_THEATRE,
    label: venueConstants.VENUE_TYPE_THEATRE
  },
  {
    value: venueConstants.VENUE_TYPE_ART_GALLERY,
    label: venueConstants.VENUE_TYPE_ART_GALLERY
  },
  {
    value: venueConstants.VENUE_TYPE_CONCERT_HALL,
    label: venueConstants.VENUE_TYPE_CONCERT_HALL
  },
  {
    value: venueConstants.VENUE_TYPE_EXHIBITION_HALL,
    label: 'Exhibition Space'
  },
  {
    value: venueConstants.VENUE_TYPE_PERFORMING_ARTS_CENTRE,
    label: 'Arts Centre'
  },
  {
    value: venueConstants.VENUE_TYPE_MUSEUM,
    label: venueConstants.VENUE_TYPE_MUSEUM
  },
  {
    value: venueConstants.VENUE_TYPE_CHURCH,
    label: venueConstants.VENUE_TYPE_CHURCH
  },
  {
    value: venueConstants.VENUE_TYPE_CINEMA,
    label: venueConstants.VENUE_TYPE_CINEMA
  },
  {
    value: venueConstants.VENUE_TYPE_OTHER,
    label: venueConstants.VENUE_TYPE_OTHER
  }
]

export const VENUE_CONSTRAINT = {
  name: {
    presence: { disallowEmpty: true },
    length: { maximum: 200 }
  },
  venueType: {
    presence: { disallowEmpty: true },
    inclusion: { within: venueConstants.ALLOWED_VENUE_TYPES }
  },
  address: {
    presence: { disallowEmpty: true },
    length: { maximum: 400 }
  },
  postcode: {
    presence: { disallowEmpty: true },
    length: { maximum: 9 },
    format: { pattern: /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s+[0-9][A-Z]{2}$/ }
  },
  email: {
    length: { maximum: 100 },
    format: { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$|^$/i }
  },
  telephone: {
    length: { maximum: 20 },
    format: { pattern: /^\d[\d\s-]{6,18}\d$|^$/ }
  },
  wheelchairAccessType: {
    presence: { disallowEmpty: true },
    inclusion: { within: accessConstants.ALLOWED_WHEELCHAIR_ACCESS_TYPES }
  },
  disabledBathroomType: {
    presence: { disallowEmpty: true },
    inclusion: { within: accessConstants.ALLOWED_DISABLED_BATHROOM_TYPES }
  },
  hearingFacilitiesType: {
    presence: { disallowEmpty: true },
    inclusion: { within: accessConstants.ALLOWED_HEARING_FACILITIES_TYPES }
  },
  images: {
    length: { maximum: 10, tooLong: 'has too many elements' }
  },
  weSay: {
    length: { maximum: 300 }
  },
  notes: {
    length: { maximum: 400 }
  }
}

export const VENUE_NORMALISER = {
  name: {
    trim: true
  },
  address: {
    trim: true
  },
  postcode: {
    trim: true
  },
  email: {
    trim: true
  },
  telephone: {
    trim: true
  },
  weSay: {
    trim: true
  },
  notes: {
    trim: true
  }
}
