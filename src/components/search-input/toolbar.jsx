import React from 'react'
import PropTypes from 'prop-types'

import './toolbar.scss'

const SearchInputToolbar = ({ children, className }) => (
  <div styleName='toolbar'>{children}</div>
)

SearchInputToolbar.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

export default SearchInputToolbar
