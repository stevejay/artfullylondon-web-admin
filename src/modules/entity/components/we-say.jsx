import React from 'react'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import * as entitiesPropTypes from '_src/entities/prop-types'
import './we-say.scss'

class EntityWeSay extends ShouldNeverUpdateComponent {
  render () {
    const { weSay } = this.props.entity

    if (!weSay) {
      return null
    }

    return (
      <p styleName='container'>
        <span styleName='label'>We say:</span><br />
        <span styleName='text'>“{weSay}”</span>
      </p>
    )
  }
}

EntityWeSay.propTypes = {
  entity: entitiesPropTypes.EDITABLE_ENTITY.isRequired
}

export default EntityWeSay
