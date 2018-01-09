import { ALLOWED_EVENT_SERIES_TYPES } from '_src/constants/event-series'
import { ALLOWED_LINK_TYPES } from '_src/constants/link'

export default {
  name: {
    presence: { disallowEmpty: true },
    length: { maximum: 200 }
  },
  eventSeriesType: {
    presence: { disallowEmpty: true },
    inclusion: { within: ALLOWED_EVENT_SERIES_TYPES }
  },
  occurrence: {
    presence: { disallowEmpty: true },
    length: { maximum: 200 }
  },
  summary: {
    presence: { disallowEmpty: true },
    length: { maximum: 140 }
  },
  descriptionCredit: {
    length: { maximum: 200 }
  },
  links: {
    length: {
      maximum: ALLOWED_LINK_TYPES.length,
      tooLong: 'has too many elements'
    }
  },
  images: {
    length: { maximum: 10, tooLong: 'has too many elements' }
  },
  weSay: {
    length: { maximum: 300 }
  }
}
