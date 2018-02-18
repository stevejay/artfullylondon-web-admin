import React from 'react'
import PropTypes from 'prop-types'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'

import entityType from '_src/entities/types/entity-type'
import * as searchConstants from '../../constants'
import './no-results.scss'

const SearchNoResults = ({ onTryAllClick, className, entityType: type }) => (
  <div styleName='container' className={className}>
    <ThumbsDown styleName='icon' />
    <p styleName='message'>Nothing found</p>
    {!!onTryAllClick &&
      type !== entityType.ALL &&
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
