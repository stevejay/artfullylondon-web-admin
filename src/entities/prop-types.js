import PropTypes from 'prop-types'
import _ from 'lodash'

import entityType from '_src/entities/entity-type'
import { SummaryVenue, FullVenue } from '_src/entities/venue'
import { SummaryTalent, FullTalent } from '_src/entities/talent'
import { SummaryEvent, FullEvent } from '_src/entities/event'
import { SummaryEventSeries, FullEventSeries } from '_src/entities/event-series'

export const EDITABLE_ENTITY = PropTypes.oneOfType([
  PropTypes.instanceOf(FullTalent),
  PropTypes.instanceOf(FullVenue),
  PropTypes.instanceOf(FullEvent),
  PropTypes.instanceOf(FullEventSeries)
])

export const SUMMARY_ENTITY = PropTypes.oneOfType([
  PropTypes.instanceOf(SummaryEvent),
  PropTypes.instanceOf(SummaryEventSeries),
  PropTypes.instanceOf(SummaryTalent),
  PropTypes.instanceOf(SummaryVenue)
])

export const ENTITY_TYPE = PropTypes.oneOf(_.values(entityType))
