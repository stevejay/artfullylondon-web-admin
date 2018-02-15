import * as eventSeriesConstants from '_src/constants/event-series'

export const EDIT_EVENT_SERIES_FORM_NAME = 'EditEventSeries'

export const EVENT_SERIES_TYPE_DROPDOWN_OPTIONS = [
  { value: eventSeriesConstants.EVENT_SERIES_TYPE_SEASON, label: 'Season' },
  {
    value: eventSeriesConstants.EVENT_SERIES_TYPE_OCCASIONAL,
    label: 'Occasional'
  }
]

export const EVENT_SERIES_CONSTRAINT = {
  name: {
    presence: { disallowEmpty: true },
    length: { maximum: 200 }
  },
  eventSeriesType: {
    presence: { disallowEmpty: true },
    inclusion: { within: eventSeriesConstants.ALLOWED_EVENT_SERIES_TYPES }
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
  images: {
    length: { maximum: 10, tooLong: 'has too many elements' }
  },
  weSay: {
    length: { maximum: 300 }
  }
}

export const EVENT_SERIES_NORMALISER = {
  name: {
    trim: true
  },
  occurrence: {
    trim: true
  },
  summary: {
    trim: true
  },
  descriptionCredit: {
    trim: true
  },
  weSay: {
    trim: true
  }
}
