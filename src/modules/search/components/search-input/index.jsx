import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import document from 'global/document'

import AutocompleteList from './autocomplete-list'
import FadeTransition from '_src/components/transition/fade'
import * as globalConstants from '_src/constants'
import './index.scss'

const AUTOCOMPLETE_MIN_SEARCH_TERM_LENGTH = 2

class SearchInput extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      currentSelectIndex: -1,
      autocompleteItems: [],
      showAutocomplete: false
    }

    this.mounted = true
  }
  handleInputMounted = ref => {
    this._input = ref
    this.props.autoFocus && ref && ref.focus()
  }
  componentWillMount () {
    document.addEventListener('click', this.handleDocumentClick, false)
  }
  componentWillUnmount () {
    this.mounted = false
    document.removeEventListener('click', this.handleDocumentClick, false)
  }
  handleDocumentClick = event => {
    if (!ReactDOM.findDOMNode(this).contains(event.target)) {
      this._clearAutocomplete()
    }
  }
  handleChange = event => {
    event.preventDefault()
    this.props.onChange(event)
    const term = (event.target.value || '').trim()

    if (
      term.length < AUTOCOMPLETE_MIN_SEARCH_TERM_LENGTH ||
      term.indexOf(':') === 0
    ) {
      this._clearAutocomplete()
    } else {
      this.props
        .onAutocompleteSearch({
          term
        })
        .then(items => {
          if (this.mounted) {
            if (items.length) {
              this.setState({
                autocompleteItems: items,
                showAutocomplete: true,
                currentSelectIndex: -1
              })
            } else {
              this._clearAutocomplete()
            }
          }
        })
    }
  }
  handleSearchKeyDown = event => {
    const { keyCode } = event

    const {
      currentSelectIndex,
      autocompleteItems,
      showAutocomplete
    } = this.state

    if (
      !(keyCode === globalConstants.ARROW_UP_KEYCODE ||
        keyCode === globalConstants.ARROW_DOWN_KEYCODE) ||
      !showAutocomplete
    ) {
      return
    }

    event.preventDefault()
    let nextSelectIndex = currentSelectIndex

    if (keyCode === globalConstants.ARROW_UP_KEYCODE) {
      if (currentSelectIndex > 0) {
        while (true) {
          nextSelectIndex -= 1

          if (nextSelectIndex === -1) {
            break
          } else if (
            autocompleteItems[nextSelectIndex].autocompleteItemType === 'entity'
          ) {
            break
          }
        }
      }
    } else if (keyCode === globalConstants.ARROW_DOWN_KEYCODE) {
      if (currentSelectIndex < autocompleteItems.length - 1) {
        while (true) {
          nextSelectIndex += 1

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
    const { currentSelectIndex, autocompleteItems } = this.state

    if (event.charCode !== globalConstants.ENTER_CHARCODE) {
      return
    }

    if (currentSelectIndex === -1) {
      this._clearAutocomplete()
      return
    }

    event.preventDefault()
    event.stopPropagation()
    this._clearAutocomplete()
    this.props.onAutocompleteSelect(autocompleteItems[currentSelectIndex])
  }
  handleAutocompleteSelect = item => {
    this._clearAutocomplete()
    this.props.onAutocompleteSelect(item)
  }
  handleInputBlur = () => {
    this._clearAutocomplete()
  }
  _clearAutocomplete = () => {
    this.setState({ showAutocomplete: false, currentSelectIndex: -1 })
  }
  render () {
    const {
      placeholder,
      searchInProgress,
      size,
      ariaLabel,
      maxLength,
      value,
      disabled
    } = this.props

    const { autocompleteItems, showAutocomplete } = this.state
    const containerStyleName = `container-${size}`
    const showDropdown = showAutocomplete && !searchInProgress && !disabled

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
          onBlur={this.handleInputBlur}
          placeholder={placeholder}
          autoCapitalize='none'
          autoCorrect='off'
          autoComplete='off'
          spellCheck={false}
          maxLength={maxLength}
          aria-label={ariaLabel}
        />
        <FadeTransition in={showDropdown} appear mountOnEnter unmountOnExit>
          <AutocompleteList
            items={autocompleteItems}
            currentIndex={this.state.currentSelectIndex}
            onSelectItem={this.handleAutocompleteSelect}
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
  onAutocompleteSearch: PropTypes.func.isRequired,
  onAutocompleteSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large']),
  maxLength: PropTypes.number,
  ariaLabel: PropTypes.string
}

SearchInput.defaultProps = {
  placeholder: 'Search\u2026',
  maxLength: 100,
  size: 'large'
}

export default SearchInput
