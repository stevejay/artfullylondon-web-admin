import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import * as entityConstants from '_src/constants/entity'
import './more-results-link.scss'

class MoreResultsLink extends ShouldNeverUpdateComponent {
  handleClick = () => {
    this.props.onClick({ entityType: this.props.entityType })
  }
  render () {
    return (
      <p styleName='container'>
        <a onClick={this.handleClick}>Click here</a> to see
        the full <strong>{this.props.entityType}</strong> results
      </p>
    )
  }
}

MoreResultsLink.propTypes = {
  entityType: PropTypes.oneOf([
    entityConstants.ENTITY_TYPE_VENUE,
    entityConstants.ENTITY_TYPE_TALENT,
    entityConstants.ENTITY_TYPE_EVENT
  ]).isRequired,
  onClick: PropTypes.func.isRequired
}

export default MoreResultsLink
