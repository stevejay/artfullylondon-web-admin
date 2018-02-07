import { ALLOWED_VENUE_TYPES } from '_src/constants/venue'
import {
  ALLOWED_WHEELCHAIR_ACCESS_TYPES,
  ALLOWED_DISABLED_BATHROOM_TYPES,
  ALLOWED_HEARING_FACILITIES_TYPES
} from '_src/constants/access'

export default {
  name: {
    presence: { disallowEmpty: true },
    length: { maximum: 200 }
  },
  venueType: {
    presence: { disallowEmpty: true },
    inclusion: { within: ALLOWED_VENUE_TYPES }
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
    inclusion: { within: ALLOWED_WHEELCHAIR_ACCESS_TYPES }
  },
  disabledBathroomType: {
    presence: { disallowEmpty: true },
    inclusion: { within: ALLOWED_DISABLED_BATHROOM_TYPES }
  },
  hearingFacilitiesType: {
    presence: { disallowEmpty: true },
    inclusion: { within: ALLOWED_HEARING_FACILITIES_TYPES }
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
