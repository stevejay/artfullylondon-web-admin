import PropTypes from 'prop-types'
import _ from 'lodash'

import entityType from '_src/domain/types/entity-type'
import { SummaryVenue, FullVenue } from '_src/domain/venue'
import { SummaryTalent, FullTalent } from '_src/domain/talent'
import { SummaryEvent, FullEvent } from '_src/domain/event'
import { SummaryEventSeries, FullEventSeries } from '_src/domain/event-series'

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
