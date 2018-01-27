import PropTypes from 'prop-types'

import { FullVenue } from '_src/entities/venue'
import { FullTalent } from '_src/entities/talent'
import { FullEvent } from '_src/entities/event'
import { FullEventSeries } from '_src/entities/event-series'

export const EDITABLE_ENTITY = PropTypes.oneOfType([
  PropTypes.instanceOf(FullTalent),
  PropTypes.instanceOf(FullVenue),
  PropTypes.instanceOf(FullEvent),
  PropTypes.instanceOf(FullEventSeries)
])
