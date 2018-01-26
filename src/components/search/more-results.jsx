import React from 'react'
import PropTypes from 'prop-types'

import MoreResultsLink from './more-results-link'
import Divider from '_src/components/divider'
import * as entityConstants from '_src/constants/entity'
import * as search from '_src/lib/search'

class SearchMoreResults extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { items, take, onClick } = this.props

    const maybeMoreVenues = search.maybeHasMoreSearchResults(
      entityConstants.ENTITY_TYPE_VENUE,
      items,
      take
    )
    const maybeMoreTalents = search.maybeHasMoreSearchResults(
      entityConstants.ENTITY_TYPE_TALENT,
      items,
      take
    )
    const maybeMoreEvents = search.maybeHasMoreSearchResults(
      entityConstants.ENTITY_TYPE_EVENT,
      items,
      take
    )

    if (!maybeMoreVenues && !maybeMoreTalents && !maybeMoreEvents) {
      return null
    } else {
      return (
        <div>
          <Divider />
          {maybeMoreVenues &&
            <MoreResultsLink
              entityType={entityConstants.ENTITY_TYPE_VENUE}
              onClick={onClick}
            />}
          {maybeMoreTalents &&
            <MoreResultsLink
              entityType={entityConstants.ENTITY_TYPE_TALENT}
              onClick={onClick}
            />}
          {maybeMoreEvents &&
            <MoreResultsLink
              entityType={entityConstants.ENTITY_TYPE_EVENT}
              onClick={onClick}
            />}
        </div>
      )
    }
  }
}

SearchMoreResults.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      entityType: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES)
        .isRequired
    })
  ).isRequired,
  take: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SearchMoreResults
