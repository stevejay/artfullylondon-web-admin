import React from 'react'
import PropTypes from 'prop-types'

import Pagination from '_src/components/pagination'
import AltBackground from '_src/components/section/alt-background'
import EntityCardCollection from '_src/components/entity-card/collection'
// import MoreResults from '_src/components/search/more-results'
import { SummaryEvent } from '_src/entities/event'
import { SummaryEventSeries } from '_src/entities/event-series'
import { SummaryTalent } from '_src/entities/talent'
import { SummaryVenue } from '_src/entities/venue'
import * as cardContentFactory
  from '_src/components/search-results-cards/card-content-factory'

class SearchResults extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.dateStr !== this.props.dateStr ||
      nextProps.className !== this.props.className
    )
  }
  render () {
    const {
      items,
      total,
      skip,
      take,
      dateStr,
      className,
      onPageClick,
      onMoreResultsClick,
      isAllSearch
    } = this.props

    // TODO think about reinstating MoreResults component.

    return (
      <React.Fragment>
        <EntityCardCollection
          className={className}
          entities={items}
          dateStr={dateStr}
          cardContentFactory={cardContentFactory.createCard}
          getInProgress={false}
        />
        {/* {isAllSearch &&
          <MoreResults
            items={items}
            take={take}
            onClick={onMoreResultsClick}
          />} */}
        <Pagination
          skip={skip}
          take={take}
          total={total}
          onPageClick={onPageClick}
        />
      </React.Fragment>
    )
  }
}

SearchResults.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(SummaryEvent),
      PropTypes.instanceOf(SummaryEventSeries),
      PropTypes.instanceOf(SummaryTalent),
      PropTypes.instanceOf(SummaryVenue)
    ]).isRequired
  ),
  total: PropTypes.number.isRequired,
  skip: PropTypes.number.isRequired,
  take: PropTypes.number.isRequired,
  className: PropTypes.string,
  isAllSearch: PropTypes.bool.isRequired,
  dateStr: PropTypes.string.isRequired,
  onPageClick: PropTypes.func.isRequired,
  onMoreResultsClick: PropTypes.func
}

export default SearchResults
