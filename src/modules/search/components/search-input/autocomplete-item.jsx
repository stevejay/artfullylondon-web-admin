import React from 'react'
import PropTypes from 'prop-types'

import * as searchConstants from '_src/constants/search-temp'
import './autocomplete-item.scss'

// TODO there's confusion here about item.output being used for the label,
// as it's not in AUTOCOMPLETE_ITEM_PROPTYPES.

class AutocompleteItem extends React.Component {
  handleClick = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSelect(this.props.item)
  }
  render () {
    const { index, currentIndex, item } = this.props
    const styleName = `item${currentIndex === index ? '-selected' : ''}`

    return (
      <li>
        <a styleName={styleName} onClick={this.handleClick}>
          {item.output}
        </a>
      </li>
    )
  }
}

AutocompleteItem.propTypes = {
  index: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  item: searchConstants.AUTOCOMPLETE_ITEM_PROPTYPES.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default AutocompleteItem
