import React from 'react'
import PropTypes from 'prop-types'

import * as entityType from '_src/domain/types/entity-type'
import * as entityLib from '../lib/entity'
import './statistic.scss'

const Statistic = ({ entityType, count }) => (
  <section styleName={`container-${entityType}`}>
    <h2>{entityLib.getLabelForEntityType(entityType)}</h2>
    <p>{count}</p>
  </section>
)

Statistic.propTypes = {
  entityType: PropTypes.oneOf(entityType.VALUES).isRequired,
  count: PropTypes.number.isRequired
}

export default Statistic
