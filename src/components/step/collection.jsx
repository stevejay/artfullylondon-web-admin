import React from 'react'
import PropTypes from 'prop-types'

import Step from '_src/components/step'
import './collection.scss'

class Collection extends React.PureComponent {
  render () {
    const { currentPage, onStepClick, steps } = this.props

    return (
      <div styleName='container'>
        {steps.map(x => (
          <Step
            key={x.page}
            title={x.title}
            page={x.page}
            currentPage={currentPage}
            onClick={onStepClick}
          />
        ))}
      </div>
    )
  }
}

Collection.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      page: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  onStepClick: PropTypes.func.isRequired
}

export default Collection
