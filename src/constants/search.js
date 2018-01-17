import PropTypes from 'prop-types'

import {
  EDITABLE_ENTITY_TYPES,
  ENTITY_TYPE_VENUE,
  ENTITY_TYPE_TALENT,
  ENTITY_TYPE_EVENT,
  ENTITY_TYPE_EVENT_SERIES,
  ENTITY_TYPE_ALL
} from '_src/constants/entity'

export const SEARCH_TYPE_BASIC = 'SEARCH_TYPE_BASIC'
export const SEARCH_TYPE_EVENT = 'SEARCH_TYPE_EVENT'
export const SEARCH_TYPE_AUTOCOMPLETE = 'SEARCH_TYPE_AUTOCOMPLETE'
export const SEARCH_TYPE_MAP_SCROLLED = 'SEARCH_TYPE_MAP_SCROLLED'

export const AUTOCOMPLETE_ITEM_TYPE_ENTITY = 'entity'
export const AUTOCOMPLETE_ITEM_TYPE_LABEL = 'label'

export const ALLOWED_AUTOCOMPLETE_ITEM_TYPES = [
  AUTOCOMPLETE_ITEM_TYPE_ENTITY,
  AUTOCOMPLETE_ITEM_TYPE_LABEL
]

export const AUTOCOMPLETE_ITEM_PROPTYPES = PropTypes.oneOfType([
  PropTypes.shape({
    autocompleteItemType: PropTypes.oneOf(ALLOWED_AUTOCOMPLETE_ITEM_TYPES),
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    entityType: PropTypes.oneOf(EDITABLE_ENTITY_TYPES).isRequired
  }),
  PropTypes.shape({
    autocompleteItemType: PropTypes.oneOf(ALLOWED_AUTOCOMPLETE_ITEM_TYPES),
    label: PropTypes.string.isRequired
  })
])

export const AUTOCOMPLETE_ITEMS_PROPTYPES = PropTypes.arrayOf(
  AUTOCOMPLETE_ITEM_PROPTYPES.isRequired
)

// ------------------------

// TODO These might not all be used?

export const DATE_PRESET_TYPE_TODAY = 'Today'
export const DATE_PRESET_TYPE_THIS_WEEKEND = 'ThisWeekend'
export const DATE_PRESET_TYPE_THIS_SATURDAY = 'ThisSaturday'
export const DATE_PRESET_TYPE_THIS_SUNDAY = 'ThisSunday'
export const DATE_PRESET_TYPE_DATE = 'Date'

export const ALLOWED_DATE_PRESET_TYPES = [
  DATE_PRESET_TYPE_TODAY,
  DATE_PRESET_TYPE_THIS_WEEKEND,
  DATE_PRESET_TYPE_THIS_SATURDAY,
  DATE_PRESET_TYPE_THIS_SUNDAY
]

export const DATE_PRESET_TYPE_DROPDOWN_OPTIONS = [
  { value: DATE_PRESET_TYPE_TODAY, label: 'Today' },
  { value: DATE_PRESET_TYPE_THIS_WEEKEND, label: 'This weekend' },
  { value: DATE_PRESET_TYPE_THIS_SATURDAY, label: 'This Saturday' },
  { value: DATE_PRESET_TYPE_THIS_SUNDAY, label: 'This Sunday' },
  { value: DATE_PRESET_TYPE_DATE, label: 'On a particular date...' }
]

// ------------------------

export const DEFAULT_TAKE = 12
export const NO_FILTER_VALUE = ':all'

export const ENTITY_TYPE_OPTIONS = [
  { id: ENTITY_TYPE_EVENT, label: 'Events' },
  { id: ENTITY_TYPE_VENUE, label: 'Venues' },
  { id: ENTITY_TYPE_TALENT, label: 'Talents' },
  { id: ENTITY_TYPE_ALL, label: 'All' }
]

export const ALLOWED_BASIC_SEARCH_ENTITY_TYPES = [
  ENTITY_TYPE_EVENT,
  ENTITY_TYPE_TALENT,
  ENTITY_TYPE_VENUE,
  ENTITY_TYPE_ALL
]

// ------------------------

const SKIP_NORMALISER = {
  toInt: true,
  default: 0
}

const TAKE_NORMALISER = {
  toInt: true,
  default: DEFAULT_TAKE
}

const TERM_NORMALISER = {
  trim: true,
  undefinedIfEmpty: true
}

export const AUTO_SEARCH_QUERY_NORMALISER = {
  term: TERM_NORMALISER
}

export const BASIC_SEARCH_QUERY_NORMALISER = {
  term: TERM_NORMALISER,
  skip: SKIP_NORMALISER,
  take: TAKE_NORMALISER
}

// ------------------------

const SKIP_CONSTRAINT = {
  presence: true,
  numericality: {
    onlyInteger: true,
    noStrings: true,
    greaterThanOrEqualTo: 0
  }
}

const TAKE_CONSTRAINT = {
  presence: true,
  numericality: {
    onlyInteger: true,
    noStrings: true,
    greaterThanOrEqualTo: 1
  }
}

const TERM_CONSTRAINT = {
  presence: true,
  length: { minimum: 1, maximum: 100 }
}

const ENTITY_TYPE_CONSTRAINT = {
  presence: true,
  inclusion: [
    ENTITY_TYPE_EVENT,
    ENTITY_TYPE_EVENT_SERIES,
    ENTITY_TYPE_TALENT,
    ENTITY_TYPE_VENUE,
    ENTITY_TYPE_ALL
  ]
}

export const AUTO_SEARCH_QUERY_CONSTRAINT = {
  term: TERM_CONSTRAINT,
  entityType: ENTITY_TYPE_CONSTRAINT
}

export const BASIC_SEARCH_QUERY_CONSTRAINT = {
  term: TERM_CONSTRAINT,
  entityType: ENTITY_TYPE_CONSTRAINT,
  skip: SKIP_CONSTRAINT,
  take: TAKE_CONSTRAINT
}

// ------------------------
