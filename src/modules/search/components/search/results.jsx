import React from 'react'
import PropTypes from 'prop-types'

import Pagination from '_src/shared/components/pagination'
import EntityCardCollection from '../entity-card/collection'
import * as searchConstants from '../../constants'
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
    } = this.props

    return (
      <React.Fragment>
        <EntityCardCollection
          className={className}
          entities={items}
          dateStr={dateStr}
          cardContentFactory={cardContentFactory.createCard}
          getInProgress={false}
        />
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
  items: PropTypes.arrayOf(searchConstants.SUMMARY_ENTITY_PROP_TYPE.isRequired),
  total: PropTypes.number.isRequired,
  skip: PropTypes.number.isRequired,
  take: PropTypes.number.isRequired,
  className: PropTypes.string,
  dateStr: PropTypes.string.isRequired,
  onPageClick: PropTypes.func.isRequired
}

export default SearchResults
