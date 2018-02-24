import React from 'react'
import PropTypes from 'prop-types'

import AutocompleteHeaderItem from './autocomplete-header-item'
import AutocompleteItem from './autocomplete-item'
import autocompleteItemType from '_src/domain/types/autocomplete-item-type'
import * as globalConstants from '_src/shared/constants'
import './autocomplete-list.scss'

const AutocompleteList = ({ items, currentIndex, className, onSelectItem }) => (
  <ul styleName='container' className={className}>
    {items.map(
      (item, index) =>
        (item.autocompleteItemType === autocompleteItemType.LABEL
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
  items: globalConstants.AUTOCOMPLETE_ITEMS_PROPTYPES.isRequired,
  className: PropTypes.string,
  onSelectItem: PropTypes.func.isRequired
}

export default AutocompleteList
