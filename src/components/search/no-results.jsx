import React from 'react'
import PropTypes from 'prop-types'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'
import { ENTITY_TYPE_ALL } from '_src/constants/entity'
import { ALLOWED_BASIC_SEARCH_ENTITY_TYPES } from '_src/constants/search'
import './no-results.scss'

class SearchNoResults extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { onTryAllClick, entityType } = this.props

    return (
      <div styleName='container'>
        <ThumbsDown styleName='icon' />
        <p styleName='message'>Nothing found</p>
        {!!onTryAllClick &&
          entityType !== ENTITY_TYPE_ALL &&
          <p styleName='action'>
            Try searching all
            by <a onClick={onTryAllClick}>clicking here</a>
          </p>}
      </div>
    )
  }
}

SearchNoResults.propTypes = {
  entityType: PropTypes.oneOf(ALLOWED_BASIC_SEARCH_ENTITY_TYPES),
  onTryAllClick: PropTypes.func
}

export default SearchNoResults
