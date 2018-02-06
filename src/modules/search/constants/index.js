import PropTypes from 'prop-types'

import * as entityConstants from '_src/constants/entity'

export const SEARCH_ENTITY_DROPDOWN_OPTIONS = [
  { label: 'All', value: entityConstants.ENTITY_TYPE_ALL },
  { label: 'Venues', value: entityConstants.ENTITY_TYPE_VENUE },
  { label: 'Events', value: entityConstants.ENTITY_TYPE_EVENT },
  { label: 'Talent', value: entityConstants.ENTITY_TYPE_TALENT }
]

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
    entityType: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES)
      .isRequired
  }),
  PropTypes.shape({
    autocompleteItemType: PropTypes.oneOf(ALLOWED_AUTOCOMPLETE_ITEM_TYPES),
    label: PropTypes.string.isRequired
  })
])

export const AUTOCOMPLETE_ITEMS_PROPTYPES = PropTypes.arrayOf(
  AUTOCOMPLETE_ITEM_PROPTYPES.isRequired
)

export const DEFAULT_TAKE = 12

export const ENTITY_TYPE_OPTIONS = [
  { id: entityConstants.ENTITY_TYPE_EVENT, label: 'Events' },
  { id: entityConstants.ENTITY_TYPE_VENUE, label: 'Venues' },
  { id: entityConstants.ENTITY_TYPE_TALENT, label: 'Talents' },
  { id: entityConstants.ENTITY_TYPE_ALL, label: 'All' }
]

export const ALLOWED_BASIC_SEARCH_ENTITY_TYPES = [
  entityConstants.ENTITY_TYPE_EVENT,
  entityConstants.ENTITY_TYPE_TALENT,
  entityConstants.ENTITY_TYPE_VENUE,
  entityConstants.ENTITY_TYPE_ALL
]

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
    entityConstants.ENTITY_TYPE_EVENT,
    entityConstants.ENTITY_TYPE_EVENT_SERIES,
    entityConstants.ENTITY_TYPE_TALENT,
    entityConstants.ENTITY_TYPE_VENUE,
    entityConstants.ENTITY_TYPE_ALL
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

export const BASIC_SEARCH_CONSTRAINT = {
  term: {
    length: {
      maximum: TERM_CONSTRAINT.length.maximum
    }
  }
}
