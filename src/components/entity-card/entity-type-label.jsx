import React from 'react'
import PropTypes from 'prop-types'
import './entity-type-label.scss'

class EntityTypeLabel extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { entity } = this.props

    return (
      <div styleName={entity.entityType}>
        {entity.entityTypeLabel}
      </div>
    )
  }
}

EntityTypeLabel.propTypes = {
  entity: PropTypes.shape({
    entityType: PropTypes.string.isRequired,
    entityTypeLabel: PropTypes.string.isRequired
  }).isRequired
}

export default EntityTypeLabel
