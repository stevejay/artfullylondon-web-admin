import { ENTITY_TYPE_EVENT_SERIES } from '_src/constants/entity'
import { EVENT_SERIES_TYPE_SEASON } from '_src/constants/event-series'
import * as sharedEntity from '_src/lib/entity'
import { LinkCollection } from '_src/entities/link-collection'

export class SummaryEventSeries {
  constructor (entity) {
    /* istanbul ignore if */
    if (!entity) {
      throw new Error('null or undefined entity')
    }

    this.entity = entity
  }

  get entityType () {
    return ENTITY_TYPE_EVENT_SERIES
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
    return this.eventSeriesType === EVENT_SERIES_TYPE_SEASON
      ? 'season'
      : 'series'
  }

  get occurrence () {
    return this.entity.occurrence
  }

  get summary () {
    return this.entity.summary
  }

  get url () {
    return sharedEntity.createEntityUrl(this.entityType, this.id)
  }

  get editUrl () {
    return sharedEntity.createEntityEditUrl(this.entityType, this.id)
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

  get isFullEntity () {
    return false
  }

  isBeingWatched (watches) {
    return !!watches[this.id]
  }

  createWatchLabel () {
    return this.name
  }

  createWatchChangeInstruction (isBeingWatched) {
    const prefix = isBeingWatched ? 'Unwatch' : 'Watch'
    return prefix + ' this event series'
  }
}

export class FullEventSeries extends SummaryEventSeries {
  constructor (entity) {
    super(entity)

    this.links = new LinkCollection(entity.links)
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

  get isFullEntity () {
    return true
  }

  createFormattedDescription () {
    return sharedEntity.processDescription(
      this.entity.description,
      this.entity.descriptionCredit
    )
  }

  createInfoBarLabel () {
    return this.entity.eventSeriesType + ' Series'
  }

  getLinkByType (linkType) {
    return this.links.getLinkByType(linkType)
  }
}
