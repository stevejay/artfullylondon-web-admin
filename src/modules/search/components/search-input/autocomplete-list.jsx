import React from 'react'
import PropTypes from 'prop-types'

import AutocompleteHeaderItem
  from '_src/modules/search/components/search-input/autocomplete-header-item'
import AutocompleteItem from '_src/modules/search/components/search-input/autocomplete-item'
import * as searchConstants from '_src/constants/search-temp'
import './autocomplete-list.scss'

const AutocompleteList = ({ items, currentIndex, className, onSelectItem }) => (
  <ul styleName='container' className={className}>
    {items.map(
      (item, index) =>
        (item.autocompleteItemType ===
          searchConstants.AUTOCOMPLETE_ITEM_TYPE_LABEL
          ? <AutocompleteHeaderItem key={item.label} label={item.label} />
          : <AutocompleteItem
            key={item.id}
            index={index}
            currentIndex={currentIndex}
            item={item}
            onSelect={onSelectItem}
          />)
    )}
  </ul>
)

AutocompleteList.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  items: searchConstants.AUTOCOMPLETE_ITEMS_PROPTYPES.isRequired,
  className: PropTypes.string,
  onSelectItem: PropTypes.func.isRequired
}

export default AutocompleteList