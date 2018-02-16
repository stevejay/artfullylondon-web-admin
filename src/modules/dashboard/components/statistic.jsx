import React from 'react'
import PropTypes from 'prop-types'

import * as entityConstants from '_src/constants/entity'
import * as entityLib from '../lib/entity'
import './statistic.scss'

const Statistic = ({ entityType, count }) => (
  <section styleName={`container-${entityType}`}>
    <h2>{entityLib.getLabelForEntityType(entityType)}</h2>
    <p>{count}</p>
  </section>
)

Statistic.propTypes = {
  entityType: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES).isRequired,
  count: PropTypes.number.isRequired
}

export default Statistic
