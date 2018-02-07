import React from 'react'
import PropTypes from 'prop-types'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'

import * as entityConstants from '_src/constants/entity'
import * as searchConstants from '_src/constants/search-temp'
import './no-results.scss'

const SearchNoResults = ({ onTryAllClick, className, entityType }) => (
  <div styleName='container' className={className}>
    <ThumbsDown styleName='icon' />
    <p styleName='message'>Nothing found</p>
    {!!onTryAllClick &&
      entityType !== entityConstants.ENTITY_TYPE_ALL &&
      <p styleName='action'>
        <a onClick={onTryAllClick}>Click here</a> to try searching everything.
      </p>}
  </div>
)

SearchNoResults.propTypes = {
  entityType: PropTypes.oneOf(
    searchConstants.ALLOWED_BASIC_SEARCH_ENTITY_TYPES
  ),
  className: PropTypes.string,
  onTryAllClick: PropTypes.func
}

export default SearchNoResults
