import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { AUTOCOMPLETE_ITEMS_PROPTYPES } from '_src/constants/search'
import './search-input.m.scss'

class SearchInput extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currentSelectIndex: -1,
      searchTerm: ''
    }
  }
  componentWillMount () {
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
      nextProps.autocompleteItems !== this.props.autocompleteItems ||
      nextProps.placeholder !== this.props.placeholder ||
      nextState.searchTerm !== this.state.searchTerm ||
      nextState.currentSelectIndex !== this.state.currentSelectIndex
    )
  }
  focus () {
    this._input.focus()
  }
  clearSearchTerm () {
    this.setState({ searchTerm: '' })
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
    this.setState({ searchTerm })

    if (searchTerm.length >= this.props.autocompleteMinSearchTermLength) {
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
  handleAutocompleteResultClick = (event, result) => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onAutocompleteResultSelect(result)
  }
  _clearAutocomplete = () => {
    if (this.props.autocompleteItems.length > 0) {
      this.props.onAutocompleteClear()
    }
  }
  render () {
    const { placeholder, size, ariaLabel, maxLength } = this.props
    const containerStyleName = `container-${size}`

    return (
      <div styleName={containerStyleName}>
        <input
          ref={ref => (this._input = ref)}
          value={this.state.searchTerm}
          styleName='input'
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
        {this.renderAutocompleteItems()}
      </div>
    )
  }
  renderAutocompleteItems () {
    const { autocompleteItems } = this.props

    if (autocompleteItems.length === 0) {
      return
    }

    return (
      <ul styleName='results-container'>
        {autocompleteItems.map((item, index) =>
          this.renderAutocompleteItem(item, index)
        )}
      </ul>
    )
  }
  renderAutocompleteItem = (item, index) => {
    const { currentSelectIndex } = this.state

    const resultStyle = `result-item${currentSelectIndex === index ? '-selected' : ''}`

    return (
      <li key={item.id}>
        <a
          styleName={resultStyle}
          onClick={event => this.handleAutocompleteResultClick(event, item)}
        >
          {item.name}
        </a>
      </li>
    )
  }
}

SearchInput.propTypes = {
  autocompleteItems: AUTOCOMPLETE_ITEMS_PROPTYPES.isRequired,
  onAutocompleteSearch: PropTypes.func.isRequired,
  onAutocompleteClear: PropTypes.func.isRequired,
  onAutocompleteResultSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
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
