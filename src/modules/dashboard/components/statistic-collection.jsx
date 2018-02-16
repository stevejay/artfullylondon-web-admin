import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import FadeTransition from '_src/components/transition/fade'
import * as entityConstants from '_src/constants/entity'
import Statistic from './statistic'
import './statistic-collection.scss'

const ENTITY_TYPES = [
  entityConstants.ENTITY_TYPE_EVENT,
  entityConstants.ENTITY_TYPE_EVENT_SERIES,
  entityConstants.ENTITY_TYPE_TALENT,
  entityConstants.ENTITY_TYPE_VENUE
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
