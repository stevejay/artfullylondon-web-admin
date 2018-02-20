import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import entityType from '_src/domain/types/entity-type'
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
    entityType.VENUE,
    entityType.TALENT,
    entityType.EVENT
  ]).isRequired,
  onClick: PropTypes.func.isRequired
}

export default MoreResultsLink
