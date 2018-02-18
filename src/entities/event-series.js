import { LinkCollection } from '_src/entities/link-collection'
import * as entityLib from '_src/lib/entity'
import eventSeriesType from '_src/entities/event-series-type'
import entityType from '_src/entities/entity-type'

export class SummaryEventSeries {
  constructor (entity) {
    this.entity = entity || {}
  }

  get entityType () {
    return entityType.EVENT_SERIES
  }

  get entityTypeLabel () {
    return 'Event Series'
  }

  get status () {
    return this.entity.status
  }

  get id () {
    return this.entity.id
  }

  get key () {
    return this.id
  }

  get name () {
    return this.entity.name
  }

  get eventSeriesType () {
    return this.entity.eventSeriesType
  }

  get eventSeriesTypeLabel () {
    return this.eventSeriesType === eventSeriesType.SEASON ? 'season' : 'series'
  }

  get occurrence () {
    return this.entity.occurrence
  }

  get summary () {
    return this.entity.summary
  }

  get url () {
    return entityLib.createEntityUrl(this.entityType, this.id)
  }

  get editUrl () {
    return entityLib.createEntityEditUrl(this.entityType, this.id)
  }

  get image () {
    return this.entity.image
  }

  get imageCopyright () {
    return this.entity.imageCopyright
  }

  get imageRatio () {
    return this.entity.imageRatio
  }

  get hasImage () {
    return !!this.image
  }
}

export class FullEventSeries extends SummaryEventSeries {
  constructor (entity) {
    super(entity)
    this._links = new LinkCollection(this.entity.links)
  }

  get version () {
    return this.entity.version
  }

  get createdDate () {
    return this.entity.createdDate
  }

  get isNew () {
    return !this.entity.id
  }

  get images () {
    return this.entity.images
  }

  get description () {
    return this.entity.description
  }

  get descriptionCredit () {
    return this.entity.descriptionCredit
  }

  get weSay () {
    return this.entity.weSay
  }

  get links () {
    return this._links
  }

  createFormattedDescription () {
    return entityLib.processDescription(
      this.entity.description,
      this.entity.descriptionCredit
    )
  }

  getInfoBarLabel () {
    return this.entity.eventSeriesType + ' Series'
  }

  getLinkByType (linkType) {
    return this.links.getLinkByType(linkType)
  }
}
