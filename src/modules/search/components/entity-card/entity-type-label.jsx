import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import './entity-type-label.scss'

class EntityTypeLabel extends ShouldNeverUpdateComponent {
  render () {
    const { entity } = this.props

    return (
      <div styleName={entity.entityType}>
        {entity.getEntityTypeLabel()}
      </div>
    )
  }
}

EntityTypeLabel.propTypes = {
  entity: PropTypes.shape({
    entityType: PropTypes.string.isRequired,
    getEntityTypeLabel: PropTypes.func.isRequired
  }).isRequired
}

export default EntityTypeLabel
