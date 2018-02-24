import PropTypes from 'prop-types'
import _ from 'lodash'
import autocompleteItemType from '_src/domain/types/autocomplete-item-type'
import { VALUES as entityTypeValues } from '_src/domain/types/entity-type'

export const ARROW_UP_KEYCODE = 38
export const ARROW_DOWN_KEYCODE = 40
export const ENTER_CHARCODE = 13
export const DATE_FORMAT = 'YYYY/MM/DD'
export const GENERIC_ERROR_MESSAGE =
  'This form has errors. Please correct them and try again.'
export const DEFAULT_TAKE = 12

// TODO remove?
export const AUTOCOMPLETE_ITEM_PROPTYPES = PropTypes.oneOfType([
  PropTypes.shape({
    autocompleteItemType: PropTypes.oneOf(_.values(autocompleteItemType)),
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    entityType: PropTypes.oneOf(entityTypeValues).isRequired
  }),
  PropTypes.shape({
    autocompleteItemType: PropTypes.oneOf(_.values(autocompleteItemType)),
    label: PropTypes.string.isRequired
  })
])

// TODO remove?
export const AUTOCOMPLETE_ITEMS_PROPTYPES = PropTypes.arrayOf(
  AUTOCOMPLETE_ITEM_PROPTYPES.isRequired
)
