import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import FadeTransition from '_src/components/transition/fade'
import entityType from '_src/domain/types/entity-type'
import Statistic from './statistic'
import './statistic-collection.scss'

const ENTITY_TYPES = [
  entityType.EVENT,
  entityType.EVENT_SERIES,
  entityType.TALENT,
  entityType.VENUE
]

class StatisticCollection extends React.PureComponent {
  render () {
    const { entityCounts } = this.props

    return (
      <FadeTransition
        in={!_.isEmpty(entityCounts)}
        mountOnEnter
        unmountOnExit
        appear
      >
        <article styleName='container'>
          {ENTITY_TYPES.map(entityType => (
            <Statistic
              key={entityType}
              entityType={entityType}
              count={
                entityCounts[entityType] ? entityCounts[entityType].count : 0
              }
            />
          ))}
        </article>
      </FadeTransition>
    )
  }
}

StatisticCollection.propTypes = {
  entityCounts: PropTypes.object.isRequired
}

export default StatisticCollection
