import React from 'react'
import PropTypes from 'prop-types'
import {
  ENTITY_TYPE_VENUE,
  ENTITY_TYPE_TALENT,
  ENTITY_TYPE_EVENT
} from '_src/constants/entity'
import './more-results-link.m.scss'

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
    ENTITY_TYPE_VENUE,
    ENTITY_TYPE_TALENT,
    ENTITY_TYPE_EVENT
  ]).isRequired,
  onClick: PropTypes.func.isRequired
}

export default MoreResultsLink
