import PropTypes from 'prop-types'

import * as entityConstants from '_src/constants/entity'

export const AUTOCOMPLETE_ITEM_TYPE_ENTITY = 'entity'
export const AUTOCOMPLETE_ITEM_TYPE_LABEL = 'label'

const ALLOWED_AUTOCOMPLETE_ITEM_TYPES = [
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

export const ALLOWED_BASIC_SEARCH_ENTITY_TYPES = [
  entityConstants.ENTITY_TYPE_EVENT,
  entityConstants.ENTITY_TYPE_TALENT,
  entityConstants.ENTITY_TYPE_VENUE,
  entityConstants.ENTITY_TYPE_ALL
]
