import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  ENTITY_TYPE_EVENT,
  ENTITY_TYPE_EVENT_SERIES,
  ENTITY_TYPE_TALENT,
  ENTITY_TYPE_VENUE,
  EDITABLE_ENTITY_TYPES
} from '_src/constants/entity'
import Statistic from '_src/components/statistic'
import './collection.m.scss'

class StatisticCollection extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  renderStatistic (entityType) {
    const entityCount = _.find(
      this.props.entityCounts,
      element => element.entityType === entityType
    )

    return (
      <Statistic
        key={entityType}
        entityType={entityType}
        count={entityCount.count}
      />
    )
  }
  render () {
    if (this.props.entityCounts.length === 0) {
      return null
    }

    return (
      <section styleName='container'>
        {this.renderStatistic(ENTITY_TYPE_EVENT)}
        {this.renderStatistic(ENTITY_TYPE_EVENT_SERIES)}
        {this.renderStatistic(ENTITY_TYPE_TALENT)}
        {this.renderStatistic(ENTITY_TYPE_VENUE)}
      </section>
    )
  }
}

StatisticCollection.propTypes = {
  entityCounts: PropTypes.arrayOf(
    PropTypes.shape({
      entityType: PropTypes.oneOf(EDITABLE_ENTITY_TYPES).isRequired,
      count: PropTypes.number.isRequired
    })
  )
}

export default StatisticCollection
