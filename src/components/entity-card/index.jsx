import React from 'react'
import PropTypes from 'prop-types'
import ArrowCircleRight from 'react-icons/lib/fa/arrow-circle-right'
import { Link } from 'react-router-dom'

import EntityCardShell from '_src/components/entity-card/shell'
import { SummaryEvent } from '_src/entities/event'
import { SummaryEventSeries } from '_src/entities/event-series'
import { SummaryTalent } from '_src/entities/talent'
import { SummaryVenue } from '_src/entities/venue'
import './index.scss'

class EntityCard extends React.PureComponent {
  render () {
    const { entity, cardContentFactory, dateStr, onClick } = this.props

    const content = React.createElement(cardContentFactory(entity.entityType), {
      entity,
      dateStr
    })

    return (
      <EntityCardShell entity={entity}>
        {content}
        <div styleName='actions-row'>
          <Link
            styleName='goto-entity'
            data-url={entity.url}
            to={entity.url}
            onClick={onClick}
          >
            <ArrowCircleRight styleName='goto-entity-icon' />
          </Link>
        </div>
      </EntityCardShell>
    )
  }
}

EntityCard.propTypes = {
  entity: PropTypes.oneOfType([
    PropTypes.instanceOf(SummaryEvent),
    PropTypes.instanceOf(SummaryEventSeries),
    PropTypes.instanceOf(SummaryTalent),
    PropTypes.instanceOf(SummaryVenue)
  ]).isRequired,
  dateStr: PropTypes.string.isRequired,
  cardContentFactory: PropTypes.func.isRequired,
  onClick: PropTypes.func
}

export default EntityCard
