import React from 'react'
import PropTypes from 'prop-types'

import './autocomplete-header-item.scss'

const AutocompleteHeaderItem = ({ label }) => (
  <li styleName='header'>
    {label}
  </li>
)

AutocompleteHeaderItem.propTypes = {
  label: PropTypes.string.isRequired
}

export default AutocompleteHeaderItem
