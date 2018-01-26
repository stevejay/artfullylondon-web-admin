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
      nextProps.input.value !== this.props.input.value ||
      nextProps.searchInProgress !== this.props.searchInProgress ||
      nextProps.placeholder !== this.props.placeholder
    )
  }
  handleAutocompleteSearch = query => {
    return this.props.dispatch({
      type: searchActionTypes.SEARCH,
      payload: {
        searchType: searchConstants.SEARCH_TYPE_AUTOCOMPLETE,
        query
      },
      meta: { thunk: true }
    })
  }
  // handleSearch = () => {
  //   this.handleClearAutocomplete()
  //   this.props.handleSubmit()
  // }
  handleAutocompleteSelect = entity => {
    // this.handleClearAutocomplete()

    console.log('handleAutocompleteSelect', entity)

    this.props.dispatch({
      type: searchActionTypes.NAVIGATE_TO_ENTITY,
      payload: entity
    })
  }
  // handleClearAutocomplete = () => {
  //   this.props.dispatch({ type: searchActionTypes.CLEAR_AUTOCOMPLETE })
  // }
  render () {
    const {
      searchInProgress,
      autoFocus,
      disabled,
      maxLength,
      input: { value, onChange },
      placeholder,
      handleSubmit
    } = this.props

    return (
      <SearchInput
        value={value}
        onChange={onChange}
        searchInProgress={searchInProgress}
        autoFocus={autoFocus}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        ariaLabel={'Search\u2026'}
        onSearch={handleSubmit}
        onAutocompleteSearch={this.handleAutocompleteSearch}
        // onAutocompleteClear={this.handleClearAutocomplete}
        onAutocompleteSelect={this.handleAutocompleteSelect}
      />
    )
  }
}

SearchField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  searchInProgress: PropTypes.bool.isRequired,
  maxLength: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  handleSubmit: PropTypes.func,
  dispatch: PropTypes.func.isRequired
}

export default connect()(SearchField)
