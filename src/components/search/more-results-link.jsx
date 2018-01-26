import React from 'react'
import PropTypes from 'prop-types'

import * as entityConstants from '_src/constants/entity'
import './more-results-link.scss'

class MoreResultsLink extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  handleClick = () => {
    this.props.onClick({ entityType: this.props.entityType })
  }
  render () {
    const { entityType } = this.props

    return (
      <p styleName='container'>
        <a onClick={this.handleClick}>Click here</a> to see
        the full <strong>{entityType}</strong> results
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
