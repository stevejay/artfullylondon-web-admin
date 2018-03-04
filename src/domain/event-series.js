import _ from 'lodash'

import { Entity } from '_src/domain/entity'
import entityType from '_src/domain/types/entity-type'
import eventSeriesType from '_src/domain/types/event-series-type'

export class SummaryEventSeries {
  constructor (entity) {
    _.extend(this, entity)
  }

  get key () {
    return this.id
  }

  getEntityTypeLabel () {
    return 'Event Series'
  }

  hasImage () {
    return !!this.image
  }

  getUrl () {
    return `/event-series/${this.id}`
  }

  getEventSeriesTypeLabel () {
    return this.eventSeriesType === eventSeriesType.SEASON ? 'season' : 'series'
  }
}

export class FullEventSeries extends Entity {
  get entityType () {
    return entityType.EVENT_SERIES
  }

  getInfoBarLabel () {
    return this.eventSeriesType + ' Series'
  }

  getEditUrl () {
    return `/event-series/edit/${this.id}`
  }
}
