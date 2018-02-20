import React from 'react'
import PropTypes from 'prop-types'

import PaginationLink from '_src/shared/components/pagination/link'
import * as pagination from '_src/shared/lib/pagination'
import './index.scss'

class Pagination extends React.PureComponent {
  render () {
    const { skip, take, total, onPageClick } = this.props

    if (total <= take) {
      return null
    }

    const totalPages = Math.ceil(total / take)
    const pageNumber = (skip + take) / take

    return (
      <ul styleName='container'>
        {pagination
          .getPaginationRange(totalPages, pageNumber)
          .map(number => (
            <PaginationLink
              key={number}
              pageNumber={number}
              currentPageNumber={pageNumber}
              totalPages={totalPages}
              onClick={onPageClick}
            />
          ))}
      </ul>
    )
  }
}

Pagination.propTypes = {
  skip: PropTypes.number.isRequired,
  take: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired
}

export default Pagination
