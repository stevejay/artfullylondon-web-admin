import React from 'react'
import PropTypes from 'prop-types'
import { EDITABLE_ENTITY_TYPES } from '_src/constants/entity'
import * as entity from '_src/lib/entity'
import './index.scss'

class Statistic extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { entityType, count } = this.props
    const containerStyleName = `container-${entityType}`

    return (
      <div styleName={containerStyleName}>
        <h2>{entity.getLabelForEntityType(entityType)}</h2>
        <p>{count}</p>
      </div>
    )
  }
}

Statistic.propTypes = {
  entityType: PropTypes.oneOf(EDITABLE_ENTITY_TYPES).isRequired,
  count: PropTypes.number.isRequired
}

export default Statistic
