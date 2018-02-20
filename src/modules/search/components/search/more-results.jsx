import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import MoreResultsLink from './more-results-link'
import Divider from '_src/shared/components/divider'
import * as entitiesPropTypes from '_src/domain/prop-types'
import entityType from '_src/domain/types/entity-type'
// TODO fix this:
import * as searchLib from '../../lib/search'

class SearchMoreResults extends ShouldNeverUpdateComponent {
  render () {
    const { items, take, onClick } = this.props

    const maybeMoreVenues = searchLib.maybeHasMoreSearchResults(
      entityType.VENUE,
      items,
      take
    )
    const maybeMoreTalents = searchLib.maybeHasMoreSearchResults(
      entityType.TALENT,
      items,
      take
    )
    const maybeMoreEvents = searchLib.maybeHasMoreSearchResults(
      entityType.EVENT,
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
            <MoreResultsLink entityType={entityType.VENUE} onClick={onClick} />}
          {maybeMoreTalents &&
            <MoreResultsLink
              entityType={entityType.TALENT}
              onClick={onClick}
            />}
          {maybeMoreEvents &&
            <MoreResultsLink entityType={entityType.EVENT} onClick={onClick} />}
        </div>
      )
    }
  }
}

SearchMoreResults.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      entityType: entitiesPropTypes.ENTITY_TYPE.isRequired
    })
  ).isRequired,
  take: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SearchMoreResults
