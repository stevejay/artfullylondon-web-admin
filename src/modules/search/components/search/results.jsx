import React from 'react'
import PropTypes from 'prop-types'

import Pagination from '_src/components/pagination'
import { EntityCardCollection } from '_src/modules/entity'
// import MoreResults from './more-results'
import * as entitiesPropTypes from '_src/entities/prop-types'
import * as cardContentFactory
  from '../search-results-cards/card-content-factory'

class SearchResults extends React.PureComponent {
  render () {
    const {
      items,
      total,
      skip,
      take,
      dateStr,
      className,
      onPageClick
      // onMoreResultsClick,
      // isAllSearch
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
  items: PropTypes.arrayOf(entitiesPropTypes.SUMMARY_ENTITY.isRequired),
  total: PropTypes.number.isRequired,
  skip: PropTypes.number.isRequired,
  take: PropTypes.number.isRequired,
  className: PropTypes.string,
  // isAllSearch: PropTypes.bool.isRequired,
  dateStr: PropTypes.string.isRequired,
  onPageClick: PropTypes.func.isRequired
  // onMoreResultsClick: PropTypes.func
}

export default SearchResults
