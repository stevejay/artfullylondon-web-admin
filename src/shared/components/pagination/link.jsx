import React from 'react'
import PropTypes from 'prop-types'
import AngleDoubleLeft from 'react-icons/lib/fa/angle-double-left'
import AngleDoubleRight from 'react-icons/lib/fa/angle-double-right'

import * as paginationLib from '_src/shared/lib/pagination'
import './link.scss'

class PaginationLink extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.currentPageNumber !== this.props.currentPageNumber
  }
  handleClick = () => {
    this.props.onClick(this.props.pageNumber)
  }
  renderIconLink (icon, onClick) {
    return (
      <button type='button' styleName='link-page' onClick={onClick}>
        {React.createElement(icon, { styleName: 'icon' })}
      </button>
    )
  }
  render () {
    const { pageNumber, currentPageNumber, totalPages } = this.props

    if (
      paginationLib.showGoToFirstPageLink(
        totalPages,
        pageNumber,
        currentPageNumber
      )
    ) {
      return this.renderIconLink(AngleDoubleLeft, this.handleClick)
    }

    if (
      paginationLib.showGoToLastPageLink(
        totalPages,
        pageNumber,
        currentPageNumber
      )
    ) {
      return this.renderIconLink(AngleDoubleRight, this.handleClick)
    }

    if (pageNumber === currentPageNumber) {
      return (
        <div styleName='current-page'>
          {pageNumber}
        </div>
      )
    } else {
      return (
        <button type='button' styleName='link-page' onClick={this.handleClick}>
          {pageNumber}
        </button>
      )
    }
  }
}

PaginationLink.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  currentPageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default PaginationLink
