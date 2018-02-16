import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

class Step extends React.PureComponent {
  handleClick = () => {
    this.props.onClick(this.props.page)
  }
  render () {
    const { title, currentPage, page } = this.props
    const showAsCompleted = currentPage > page
    const showAsCurrentPage = currentPage === page
    const showAsNextPage = currentPage + 1 === page
    const isClickable = showAsCompleted || showAsNextPage

    const stepStyle = showAsCompleted
      ? 'step-completed'
      : showAsNextPage
          ? 'step-next'
          : showAsCurrentPage ? 'step-active' : 'step-disabled'

    return (
      <li
        styleName={stepStyle}
        tabIndex={isClickable ? 0 : -1}
        onClick={isClickable ? this.handleClick : null}
      >
        <span styleName='number'>{page}</span>
        <span styleName='title'>{title}</span>
      </li>
    )
  }
}

Step.propTypes = {
  title: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Step
