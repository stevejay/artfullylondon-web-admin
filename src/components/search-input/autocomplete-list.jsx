import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import AutocompleteHeaderItem
  from '_src/components/search-input/autocomplete-header-item'
import AutocompleteItem from '_src/components/search-input/autocomplete-item'
import * as searchConstants from '_src/constants/search'
import './autocomplete-list.m.scss'

const AutocompleteList = ({
  items,
  currentIndex,
  searchInProgress,
  disabled,
  onSelectItem
}) => {
  if (_.isEmpty(items) || searchInProgress || disabled) {
    return null
  }

  return (
    <ul styleName='container'>
      {items.map(
        (item, index) =>
          (item.autocompleteItemType ===
            searchConstants.AUTOCOMPLETE_ITEM_TYPE_LABEL
            ? <AutocompleteHeaderItem
              key={item.label}
              entityName={item.label}
            />
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
}

AutocompleteList.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  items: searchConstants.AUTOCOMPLETE_ITEMS_PROPTYPES.isRequired,
  searchInProgress: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSelectItem: PropTypes.func.isRequired
}

export default AutocompleteList
