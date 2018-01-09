import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import SearchIcon from 'react-icons/lib/fa/search'

import Loader from '_src/components/loader'
import AutocompleteList from '_src/components/search-input/autocomplete-list'
import * as searchConstants from '_src/constants/search'
import './index.m.scss'

class SearchInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = { currentSelectIndex: -1 }
    document.addEventListener('click', this.handleDocumentClick, false)
  }
  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocumentClick, false)
  }
  componentWillReceiveProps (nextProps) {
    const { autocompleteItems } = this.props

    if (nextProps.autocompleteItems !== autocompleteItems) {
      this.setState({ currentSelectIndex: -1 })
    }
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.searchInProgress !== this.props.searchInProgress ||
      nextProps.autocompleteItems !== this.props.autocompleteItems ||
      nextProps.value !== this.props.value ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.placeholder !== this.props.placeholder ||
      nextState.currentSelectIndex !== this.state.currentSelectIndex
    )
  }
  focus () {
    this._input.focus()
  }
  handleDocumentClick = event => {
    if (ReactDOM.findDOMNode(this).contains(event.target)) {
      return
    }

    this._clearAutocomplete()
  }
  handleChange = event => {
    event.preventDefault()
    const searchTerm = event.target.value

    this.props.onChange(event)

    if (
      searchTerm.length < this.props.autocompleteMinSearchTermLength ||
      searchTerm.indexOf(':') === 0
    ) {
      this._clearAutocomplete()
    } else {
      this.props.onAutocompleteSearch(searchTerm)
    }
  }
  handleSearchKeyDown = event => {
    const { keyCode } = event
    if (!(keyCode === 38 || keyCode === 40)) {
      return
    }

    event.preventDefault()
    const { autocompleteItems } = this.props
    const { currentSelectIndex } = this.state
    let nextSelectIndex = currentSelectIndex

    if (keyCode === 38) {
      if (currentSelectIndex > 0) {
        while (true) {
          --nextSelectIndex

          if (nextSelectIndex === -1) {
            break
          } else if (
            autocompleteItems[nextSelectIndex].autocompleteItemType === 'entity'
          ) {
            break
          }
        }
      }
    } else if (keyCode === 40) {
      if (currentSelectIndex < autocompleteItems.length - 1) {
        while (true) {
          ++nextSelectIndex

          if (nextSelectIndex === autocompleteItems.length) {
            nextSelectIndex = currentSelectIndex
            break
          } else if (
            autocompleteItems[nextSelectIndex].autocompleteItemType === 'entity'
          ) {
            break
          }
        }
      }
    }

    if (nextSelectIndex !== currentSelectIndex) {
      this.setState({ currentSelectIndex: nextSelectIndex })
    }
  }
  handleSearchKeyPress = event => {
    const { currentSelectIndex } = this.state

    if (event.charCode !== 13 || currentSelectIndex === -1) {
      return
    }

    const { autocompleteItems, onAutocompleteResultSelect } = this.props

    event.preventDefault()
    event.stopPropagation()
    onAutocompleteResultSelect(autocompleteItems[currentSelectIndex])
  }
  handleSearchClick = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onFullSearch()
  }
  _clearAutocomplete = () => {
    if (this.props.autocompleteItems.length > 0) {
      this.props.onAutocompleteClear()
    }
  }
  render () {
    const {
      autocompleteItems,
      placeholder,
      searchInProgress,
      onFullSearch,
      size,
      ariaLabel,
      autoFocus,
      maxLength,
      value,
      disabled,
      onAutocompleteResultSelect
    } = this.props

    const containerStyleName = `container-${size}`

    return (
      <div styleName={containerStyleName}>
        <input
          ref={ref => {
            this._input = ref
            if (autoFocus && ref) {
              ref.focus()
            }
          }}
          styleName='input'
          value={disabled ? '' : value}
          type='text'
          onChange={this.handleChange}
          onKeyDown={this.handleSearchKeyDown}
          onKeyPress={this.handleSearchKeyPress}
          placeholder={placeholder}
          autoCapitalize='none'
          autoCorrect='off'
          autoComplete='off'
          spellCheck={false}
          maxLength={maxLength}
          aria-label={ariaLabel}
        />
        {!!onFullSearch &&
          <div styleName='link' tabIndex='0' onClick={this.handleSearchClick}>
            {searchInProgress
              ? <Loader size='medium' />
              : <SearchIcon styleName='icon' />}
          </div>}
        <AutocompleteList
          items={autocompleteItems}
          currentIndex={this.state.currentSelectIndex}
          searchInProgress={searchInProgress}
          disabled={disabled}
          onSelectItem={onAutocompleteResultSelect}
        />
      </div>
    )
  }
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  searchInProgress: PropTypes.bool.isRequired,
  autocompleteItems: searchConstants.AUTOCOMPLETE_ITEMS_PROPTYPES.isRequired,
  onFullSearch: PropTypes.func,
  onAutocompleteSearch: PropTypes.func.isRequired,
  onAutocompleteClear: PropTypes.func.isRequired,
  onAutocompleteResultSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  autocompleteMinSearchTermLength: PropTypes.number,
  size: PropTypes.oneOf(['small', 'large']),
  maxLength: PropTypes.number,
  ariaLabel: PropTypes.string
}

SearchInput.defaultProps = {
  placeholder: 'Enter a search term...',
  autocompleteMinSearchTermLength: 2,
  maxLength: 100,
  size: 'large'
}

export default SearchInput
