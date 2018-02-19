import _ from 'lodash'

import { Entity } from '_src/domain/entity'
import entityType from '_src/domain/types/entity-type'
import eventSeriesType from '_src/domain/types/event-series-type'

export class FullEventSeries extends Entity {
  get entityType () {
    return entityType.EVENT_SERIES
  }

  getInfoBarLabel () {
    return this.eventSeriesType + ' Series'
  }

  get url () {
    throw new Error('url accessed')
  }

  get editUrl () {
    return `/event-series/edit/${this.id}`
  }
}

export class SummaryEventSeries {
  constructor (entity) {
    _.extend(this, entity)
  }

  get entityTypeLabel () {
    return 'Event Series'
  }

  get key () {
    return this.id
  }

  get hasImage () {
    return !!this.image
  }

  get url () {
    return `/event-series/${this.id}`
  }

  get eventSeriesTypeLabel () {
    return this.eventSeriesType === eventSeriesType.SEASON ? 'season' : 'series'
  }
}
