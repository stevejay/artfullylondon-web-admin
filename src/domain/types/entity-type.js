import _ from 'lodash'

const TYPE = {
  EVENT: 'event',
  EVENT_SERIES: 'event-series',
  VENUE: 'venue',
  TALENT: 'talent',
  TAG: 'tag',
  USER: 'user',
  ALL: 'all'
}

export default TYPE
export const VALUES = _.values(TYPE)
