import React from 'react'
import PropTypes from 'prop-types'

import SearchInput from '_src/components/search-input'

const SearchInputFieldBasic = ({ input: { value, onChange }, ...rest }) => (
  <SearchInput {...rest} value={value} onChange={onChange} />
)

SearchInputFieldBasic.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  searchInProgress: PropTypes.bool.isRequired,
  onAutocompleteSearch: PropTypes.func.isRequired,
  onAutocompleteSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  maxLength: PropTypes.number,
  ariaLabel: PropTypes.string
}

export default SearchInputFieldBasic
