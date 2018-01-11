import React from 'react'
import PropTypes from 'prop-types'

import './autocomplete-header-item.scss'

const AutocompleteHeaderItem = ({ entityName }) =>
  <li styleName='header'>
    {entityName}
  </li>

AutocompleteHeaderItem.propTypes = {
  entityName: PropTypes.string.isRequired
}

export default AutocompleteHeaderItem
