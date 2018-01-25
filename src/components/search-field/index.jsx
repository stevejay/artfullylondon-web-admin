import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SearchInput from '_src/components/search-input'
import * as searchConstants from '_src/constants/search'
import * as entityConstants from '_src/constants/entity'
import * as searchActionTypes from '_src/constants/action/search'

export class SearchField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.value !== this.props.value ||
      nextProps.searchInProgress !== this.props.searchInProgress ||
      nextProps.placeholder !== this.props.placeholder ||
      nextProps.autocompleteItems !== this.props.autocompleteItems ||
      nextProps.canShowAutocompleteItems !== this.props.canShowAutocompleteItems
    )
  }
  handleAutocompleteSearch = term => {
    this.props.dispatch({
      type: searchActionTypes.SEARCH,
      payload: {
        searchType: searchConstants.SEARCH_TYPE_AUTOCOMPLETE,
        query: { term, entityType: entityConstants.ENTITY_TYPE_ALL }
      }
    })
  }
  handleSearch = () => {
    this.handleClearAutocomplete()
    this.props.onSearch()
  }
  handleAutocompleteResultSelect = entity => {
    this.handleClearAutocomplete()

    this.props.dispatch({
      type: searchActionTypes.NAVIGATE_TO_ENTITY,
      payload: { entityType: entity.entityType, id: entity.id }
    })
  }
  handleClearAutocomplete = () => {
    this.props.dispatch({ type: searchActionTypes.CLEAR_AUTOCOMPLETE })
  }
  render () {
    const {
      searchInProgress,
      autocompleteItems,
      autoFocus,
      disabled,
      maxLength,
      value,
      onChange,
      placeholder,
      canShowAutocompleteItems
    } = this.props

    const items = canShowAutocompleteItems ? autocompleteItems : []

    return (
      <SearchInput
        value={value}
        onChange={onChange}
        searchInProgress={searchInProgress}
        autocompleteItems={items}
        onSearch={this.handleSearch}
        onAutocompleteSearch={this.handleAutocompleteSearch}
        onAutocompleteClear={this.handleClearAutocomplete}
        onAutocompleteResultSelect={this.handleAutocompleteResultSelect}
        autoFocus={autoFocus}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        ariaLabel='Search for events, talents, and venues'
      />
    )
  }
}

SearchField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  searchInProgress: PropTypes.bool.isRequired,
  maxLength: PropTypes.number.isRequired,
  canShowAutocompleteItems: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  autocompleteItems: searchConstants.AUTOCOMPLETE_ITEMS_PROPTYPES.isRequired,
  onSearch: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect((state, ownProps) => ({
  autocompleteItems: state.search.autocompleteItems,
  canShowAutocompleteItems: !ownProps.hideAutocompleteOnModal ||
    !state.modal.showQuicksearch
}))(SearchField)
