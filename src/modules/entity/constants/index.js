import PropTypes from 'prop-types'

import { FullVenue } from '_src/domain/venue'
import { FullTalent } from '_src/domain/talent'
import { FullEvent } from '_src/domain/event'
import { FullEventSeries } from '_src/domain/event-series'

export const EDITABLE_ENTITY_PROP_TYPE = PropTypes.oneOfType([
  PropTypes.instanceOf(FullTalent),
  PropTypes.instanceOf(FullVenue),
  PropTypes.instanceOf(FullEvent),
  PropTypes.instanceOf(FullEventSeries)
])
