import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Loader from '_src/components/loader'
import AltBackground from '_src/components/section/alt-background'
import { SummaryEvent } from '_src/entities/event'
import { SummaryEventSeries } from '_src/entities/event-series'
import { SummaryTalent } from '_src/entities/talent'
import { SummaryVenue } from '_src/entities/venue'
import EntityCard from './index'
import NoContent from './no-content'
import './collection.scss'

class EntityCardCollection extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.entities !== this.props.entities ||
      nextProps.getInProgress !== this.props.getInProgress ||
      nextProps.dateStr !== this.props.dateStr
    )
  }
  componentDidMount () {
    this.props.onMounted && this.props.onMounted()
  }
  render () {
    const { entities, cardContentFactory, dateStr, getInProgress } = this.props

    return (
      <AltBackground styleName='background'>
        {getInProgress && <Loader size='massive' />}
        {!getInProgress && _.isEmpty(entities) && <NoContent />}
        {!getInProgress &&
          !_.isEmpty(entities) &&
          <div styleName='cards-container'>
            {entities.map(entity => (
              <EntityCard
                key={entity.key}
                entity={entity}
                dateStr={dateStr}
                cardContentFactory={cardContentFactory}
              />
            ))}
          </div>}
      </AltBackground>
    )
  }
}

EntityCardCollection.propTypes = {
  entities: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(SummaryEvent),
      PropTypes.instanceOf(SummaryEventSeries),
      PropTypes.instanceOf(SummaryTalent),
      PropTypes.instanceOf(SummaryVenue)
    ]).isRequired
  ),
  getInProgress: PropTypes.bool,
  dateStr: PropTypes.string.isRequired,
  cardContentFactory: PropTypes.func.isRequired,
  onMounted: PropTypes.func
}

export default EntityCardCollection
