import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import FadeTransition from '_src/components/transition/fade'
import Statistic from './index'
import * as entityConstants from '_src/constants/entity'
import './collection.scss'

class StatisticCollection extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.entityCounts !== this.props.entityCounts
  }
  _getEntityCount (entityType) {
    const entityCount = _.find(
      this.props.entityCounts,
      element => element.entityType === entityType
    )

    return entityCount ? entityCount.count : 0
  }
  render () {
    return (
      <FadeTransition
        in={!_.isEmpty(this.props.entityCounts)}
        mountOnEnter
        unmountOnExit
        appear
      >
        <section styleName='container'>
          {[
            entityConstants.ENTITY_TYPE_EVENT,
            entityConstants.ENTITY_TYPE_EVENT_SERIES,
            entityConstants.ENTITY_TYPE_TALENT,
            entityConstants.ENTITY_TYPE_VENUE
          ].map(entityType => (
            <Statistic
              key={entityType}
              entityType={entityType}
              count={this._getEntityCount(entityType)}
            />
          ))}
        </section>
      </FadeTransition>
    )
  }
}

StatisticCollection.propTypes = {
  entityCounts: PropTypes.arrayOf(
    PropTypes.shape({
      entityType: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES)
        .isRequired,
      count: PropTypes.number.isRequired
    })
  )
}

export default StatisticCollection
