import PropTypes from 'prop-types'
import _ from 'lodash'

import * as globalConstants from '_src/constants'
import * as entitiesPropTypes from '_src/entities/prop-types'
import entityType from '_src/entities/types/entity-type'
import autocompleteItemType from '_src/entities/types/autocomplete-item-type'

export const BASIC_SEARCH_FORM_NAME = 'BasicSearch'
export const HEADER_SEARCH_FORM_NAME = 'HeaderSearch'

export const SEARCH_ENTITY_DROPDOWN_OPTIONS = [
  { label: 'All', value: entityType.ALL },
  { label: 'Venues', value: entityType.VENUE },
  { label: 'Events', value: entityType.EVENT },
  { label: 'Talent', value: entityType.TALENT }
]

export const SEARCH_TYPE_BASIC = 'SEARCH_TYPE_BASIC'
export const SEARCH_TYPE_EVENT = 'SEARCH_TYPE_EVENT'
export const SEARCH_TYPE_AUTOCOMPLETE = 'SEARCH_TYPE_AUTOCOMPLETE'
export const SEARCH_TYPE_MAP_SCROLLED = 'SEARCH_TYPE_MAP_SCROLLED'

export const AUTOCOMPLETE_ITEM_PROPTYPES = PropTypes.oneOfType([
  PropTypes.shape({
    autocompleteItemType: PropTypes.oneOf(_.values(autocompleteItemType)),
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    entityType: entitiesPropTypes.ENTITY_TYPE.isRequired
  }),
  PropTypes.shape({
    autocompleteItemType: PropTypes.oneOf(_.values(autocompleteItemType)),
    label: PropTypes.string.isRequired
  })
])

export const AUTOCOMPLETE_ITEMS_PROPTYPES = PropTypes.arrayOf(
  AUTOCOMPLETE_ITEM_PROPTYPES.isRequired
)

export const ALLOWED_BASIC_SEARCH_ENTITY_TYPES = [
  entityType.EVENT,
  entityType.TALENT,
  entityType.VENUE,
  entityType.ALL
]

const SKIP_NORMALISER = {
  toInt: true,
  default: 0
}

const TAKE_NORMALISER = {
  toInt: true,
  default: globalConstants.DEFAULT_TAKE
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
    entityType.EVENT,
    entityType.EVENT_SERIES,
    entityType.TALENT,
    entityType.VENUE,
    entityType.ALL
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
