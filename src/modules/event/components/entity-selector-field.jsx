import React from 'react'
import PropTypes from 'prop-types'

import EntitySelector from './entity-selector'
import { VALUES as entityTypeValues } from '_src/domain/types/entity-type'

const EntitySelectorField = ({
  entityType,
  label,
  input: { value, onChange },
  meta: { error, touched },
  required,
  onAutocompleteSearch,
  onAutocompleteSelect
}) => (
  <EntitySelector
    value={value}
    onChange={onChange}
    error={error}
    touched={touched}
    required={required}
    label={label}
    entityType={entityType}
    onAutocompleteSearch={onAutocompleteSearch}
    onAutocompleteSelect={onAutocompleteSelect}
  />
)

EntitySelectorField.propTypes = {
  entityType: PropTypes.oneOf(entityTypeValues).isRequired,
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    }),
    onChange: PropTypes.func.isRequired
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }),
  required: PropTypes.bool,
  onAutocompleteSearch: PropTypes.func.isRequired,
  onAutocompleteSelect: PropTypes.func.isRequired
}

export default EntitySelectorField
