import React from 'react'
import PropTypes from 'prop-types'

import Search from '_src/components/search-field'
import './field.scss'

class SearchField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.placeholder !== this.props.placeholder ||
      nextProps.searchInProgress !== this.props.searchInProgress
    )
  }
  render () {
    const {
      input,
      maxLength,
      placeholder,
      autoFocus,
      searchInProgress,
      handleSubmit,
      disabled,
      hideAutocompleteOnModal
    } = this.props

    return (
      <div styleName='container'>
        <Search
          input={input}
          searchInProgress={searchInProgress}
          autoFocus={autoFocus}
          disabled={disabled}
          maxLength={maxLength}
          hideAutocompleteOnModal={hideAutocompleteOnModal}
          placeholder={placeholder}
          handleSubmit={handleSubmit}
        />
      </div>
    )
  }
}

SearchField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  searchInProgress: PropTypes.bool.isRequired,
  maxLength: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  hideAutocompleteOnModal: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  handleSubmit: PropTypes.func
}

export default SearchField
