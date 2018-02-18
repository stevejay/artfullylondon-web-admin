import _ from 'lodash'

import wheelchairAccessType from '_src/entities/types/wheelchair-access-type'
import disabledBathroomType from '_src/entities/types/disabled-bathroom-type'
import hearingFacilitiesType from '_src/entities/types/hearing-facilities-type'
import venueType from '_src/entities/types/venue-type'

export const EDIT_VENUE_FORM_NAME = 'EditVenue'

export const HEARING_FACILITIES_TYPE_DROPDOWN_OPTIONS = [
  {
    value: hearingFacilitiesType.NOT_APPLICABLE,
    label: 'Not applicable'
  },
  {
    value: hearingFacilitiesType.HEARING_LOOPS,
    label: 'Hearing loops in all spaces'
  },
  {
    value: hearingFacilitiesType.PARTIAL_HEARING_LOOPS,
    label: 'Hearing loops in some spaces'
  },
  {
    value: hearingFacilitiesType.NO_HEARING_LOOPS,
    label: 'No hearing loops'
  },
  { value: hearingFacilitiesType.UNKNOWN, label: 'Unknown' }
]

export const DISABLED_BATHROOM_TYPE_DROPDOWN_OPTIONS = [
  {
    value: disabledBathroomType.NOT_APPLICABLE,
    label: 'Not applicable'
  },
  { value: disabledBathroomType.PRESENT, label: 'Present' },
  {
    value: disabledBathroomType.NOT_PRESENT,
    label: 'Not present'
  },
  { value: disabledBathroomType.UNKNOWN, label: 'Unknown' }
]

export const WHEELCHAIR_ACCESS_TYPE_DROPDOWN_OPTIONS = [
  {
    value: wheelchairAccessType.NOT_APPLICABLE,
    label: 'Not applicable'
  },
  {
    value: wheelchairAccessType.FULL_ACCESS,
    label: 'Access to all spaces'
  },
  {
    value: wheelchairAccessType.PARTIAL_ACCESS,
    label: 'Access to some spaces'
  },
  {
    value: wheelchairAccessType.NO_ACCESS,
    label: 'No access'
  },
  { value: wheelchairAccessType.UNKNOWN, label: 'Unknown' }
]

export const VENUE_TYPE_DROPDOWN_OPTIONS = [
  {
    value: venueType.THEATRE,
    label: venueType.THEATRE
  },
  {
    value: venueType.ART_GALLERY,
    label: venueType.ART_GALLERY
  },
  {
    value: venueType.CONCERT_HALL,
    label: venueType.CONCERT_HALL
  },
  {
    value: venueType.EXHIBITION_HALL,
    label: 'Exhibition Space'
  },
  {
    value: venueType.PERFORMING_ARTS_CENTRE,
    label: 'Arts Centre'
  },
  {
    value: venueType.MUSEUM,
    label: venueType.MUSEUM
  },
  {
    value: venueType.CHURCH,
    label: venueType.CHURCH
  },
  {
    value: venueType.CINEMA,
    label: venueType.CINEMA
  },
  {
    value: venueType.OTHER,
    label: venueType.OTHER
  }
]

export const VENUE_CONSTRAINT = {
  name: {
    presence: { disallowEmpty: true },
    length: { maximum: 200 }
  },
  venueType: {
    presence: { disallowEmpty: true },
    inclusion: { within: _.values(venueType) }
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
    inclusion: { within: _.values(wheelchairAccessType) }
  },
  disabledBathroomType: {
    presence: { disallowEmpty: true },
    inclusion: { within: _.values(disabledBathroomType) }
  },
  hearingFacilitiesType: {
    presence: { disallowEmpty: true },
    inclusion: { within: _.values(hearingFacilitiesType) }
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
