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

    const stepStyle = showAsCompleted
      ? 'step-completed'
      : showAsNextPage
          ? 'step-next'
          : showAsCurrentPage ? 'step-active' : 'step-disabled'

    if (showAsCompleted || showAsNextPage) {
      return (
        <a styleName={stepStyle} onClick={this.handleClick}>
          <div styleName='number'>{page}</div>
          <div styleName='title'>{title}</div>
        </a>
      )
    }

    return (
      <div styleName={stepStyle}>
        <div styleName='number'>{page}</div>
        <div styleName='title'>{title}</div>
      </div>
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
