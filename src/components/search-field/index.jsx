import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchInput from '_src/components/search-input'
import * as searchConstants from '_src/constants/search'
import * as entityConstants from '_src/constants/entity'
import {
  clearAutocomplete,
  search,
  navigateToEntity
} from '_src/actions/search'

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
    this.props.search({
      searchType: searchConstants.SEARCH_TYPE_AUTOCOMPLETE,
      query: { term, entityType: entityConstants.ENTITY_TYPE_ALL }
    })
  }
  handleFullSearch = () => {
    this.props.clearAutocomplete()
    this.props.onFullSearch()
  }
  handleAutocompleteResultSelect = entity => {
    this.props.clearAutocomplete()

    this.props.navigateToEntity({
      entityType: entity.entityType,
      id: entity.id
    })
  }
  render () {
    const {
      searchInProgress,
      autocompleteItems,
      clearAutocomplete,
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
        onFullSearch={this.handleFullSearch}
        onAutocompleteSearch={this.handleAutocompleteSearch}
        onAutocompleteClear={clearAutocomplete}
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
  search: PropTypes.func.isRequired,
  clearAutocomplete: PropTypes.func.isRequired,
  onFullSearch: PropTypes.func.isRequired,
  navigateToEntity: PropTypes.func.isRequired
}

export default connect(
  (state, ownProps) => ({
    autocompleteItems: state.search.autocompleteItems,
    canShowAutocompleteItems: !ownProps.hideAutocompleteOnModal ||
      !state.modal.showQuicksearch
  }),
  dispatch => ({
    navigateToEntity: bindActionCreators(navigateToEntity, dispatch),
    search: bindActionCreators(search, dispatch),
    clearAutocomplete: bindActionCreators(clearAutocomplete, dispatch)
  })
)(SearchField)
