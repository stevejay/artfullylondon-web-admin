import React from 'react'
import PropTypes from 'prop-types'

import * as entityConstants from '_src/constants/entity'
import * as entityLib from '_src/lib/entity'
import './index.scss'

const Statistic = ({ entityType, count }) => (
  <div styleName={`container-${entityType}`}>
    <h2>{entityLib.getLabelForEntityType(entityType)}</h2>
    <p>{count}</p>
  </div>
)

Statistic.propTypes = {
  entityType: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES).isRequired,
  count: PropTypes.number.isRequired
}

export default Statistic
