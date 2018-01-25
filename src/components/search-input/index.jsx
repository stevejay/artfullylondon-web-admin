import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import SearchIcon from 'react-icons/lib/fa/search'
import Select from 'react-select'

import IconButton from '_src/components/button/icon'
import Loader from '_src/components/loader'
import AutocompleteList from '_src/components/search-input/autocomplete-list'
import FadeTransition from '_src/components/transition/fade'
import * as searchConstants from '_src/constants/search'
import * as browserConstants from '_src/constants/browser'
import './index.scss'

class SearchInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = { currentSelectIndex: -1 }
    document.addEventListener('click', this.handleDocumentClick, false)
  }
  handleInputMounted = ref => {
    this._input = ref
    this.props.autoFocus && ref && ref.focus()
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
    this.props.onChange(event)
    const searchTerm = event.target.value

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

    if (
      !(keyCode === browserConstants.ARROW_UP_KEYCODE ||
        keyCode === browserConstants.ARROW_DOWN_KEYCODE)
    ) {
      return
    }

    event.preventDefault()
    const { autocompleteItems } = this.props
    const { currentSelectIndex } = this.state
    let nextSelectIndex = currentSelectIndex

    if (keyCode === browserConstants.ARROW_UP_KEYCODE) {
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
    } else if (keyCode === browserConstants.ARROW_DOWN_KEYCODE) {
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
    const { autocompleteItems, onAutocompleteResultSelect } = this.props
    const { currentSelectIndex } = this.state

    if (
      event.charCode !== browserConstants.ENTER_CHARCODE ||
      currentSelectIndex === -1
    ) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    onAutocompleteResultSelect(autocompleteItems[currentSelectIndex])
  }
  handleSearchClick = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSearch()
  }
  _clearAutocomplete = () => {
    this.props.autocompleteItems.length && this.props.onAutocompleteClear()
  }
  render () {
    const {
      autocompleteItems,
      placeholder,
      searchInProgress,
      onSearch,
      size,
      ariaLabel,
      autoFocus,
      maxLength,
      value,
      disabled,
      onAutocompleteResultSelect
    } = this.props

    const containerStyleName = `container-${size}`

    const showDropdown =
      !_.isEmpty(autocompleteItems) && !searchInProgress && !disabled

    return (
      <div styleName={containerStyleName}>
        <input
          ref={this.handleInputMounted}
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
        {!!onSearch &&
          <IconButton
            icon={SearchIcon}
            onClick={this.handleSearchClick}
            aria-label='Search'
            styleName='search-button'
          />}
        <FadeTransition in={showDropdown} appear mountOnEnter unmountOnExit>
          <AutocompleteList
            items={autocompleteItems}
            currentIndex={this.state.currentSelectIndex}
            searchInProgress={searchInProgress}
            disabled={disabled}
            onSelectItem={onAutocompleteResultSelect}
          />
        </FadeTransition>
      </div>
    )
  }
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  searchInProgress: PropTypes.bool.isRequired,
  autocompleteItems: searchConstants.AUTOCOMPLETE_ITEMS_PROPTYPES.isRequired,
  onSearch: PropTypes.func,
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
  placeholder: 'Enter a search term\u2026',
  autocompleteMinSearchTermLength: 2,
  maxLength: 100,
  size: 'large'
}

export default SearchInput
