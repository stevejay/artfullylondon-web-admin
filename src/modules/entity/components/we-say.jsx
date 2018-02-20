import React from 'react'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import * as entityConstants from '../constants'
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
  entity: entityConstants.EDITABLE_ENTITY_PROP_TYPE.isRequired
}

export default EntityWeSay
