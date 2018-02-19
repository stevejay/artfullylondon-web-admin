import _ from 'lodash'

import { Entity } from '_src/domain/entity'
import { EventSummaryTalent } from '_src/domain/talent'
import { SummaryVenue } from '_src/domain/venue'
import { SummaryEventSeries } from '_src/domain/event-series'
import entityType from '_src/domain/types/entity-type'
import linkType from '_src/domain/types/link-type'
import costType from '_src/domain/types/cost-type'
import tagType from '_src/domain/types/tag-type'
import * as entityLib from '_src/lib/entity'
import * as venueLib from '_src/lib/venue'
import * as timeLib from '_src/lib/time'
import * as eventLib from '_src/lib/event'

export class SummaryEvent {
  constructor (entity) {
    _.extend(this, entity)
    this.cardImageLoaded = false
  }

  get key () {
    return this.id
  }

  isFreeEvent () {
    return this.costType === costType.FREE
  }

  getEntityTypeLabel () {
    return this.isFreeEvent() ? 'Free Event' : 'Event'
  }

  hasImage () {
    return !!this.image
  }

  getUrl () {
    return `/event/${this.id}`
  }

  getPostcodeDistrict () {
    return venueLib.getPostcodeDistrict(this.postcode)
  }

  isExpiredOn (dateStr) {
    return dateStr > this.dateTo
  }

  createDateRangeLabel (dateStr) {
    return timeLib.createDateRangeLabel(dateStr, this.dateFrom, this.dateTo)
  }

  isCurrent (dateStr) {
    return (
      !this.dateFrom || (this.dateFrom <= dateStr && this.dateTo >= dateStr)
    )
  }

  createShallowClone (newProps) {
    return new SummaryEvent({ ...this, ...newProps })
  }
}

export class FullEvent extends Entity {
  constructor (entity) {
    super(entity)

    this.venue = new SummaryVenue(this.venue)

    this.talents = (this.talents || [])
      .map(talent => new EventSummaryTalent(talent))

    this.eventSeries = this.eventSeries
      ? new SummaryEventSeries(this.eventSeries)
      : null

    this.tags = [
      ..._addTagType(this.mediumTags, tagType.MEDIUM),
      ..._addTagType(this.styleTags, tagType.STYLE),
      ..._addTagType(this.geoTags, tagType.GEO),
      ..._addTagType(this.audienceTags, tagType.AUDIENCE)
    ]
  }

  getInfoBarLabel () {
    return this.createEventMediumDescription()
  }

  createEventMediumDescription () {
    // TODO mixed visual arts, and mixed performing arts
    const mediumTags = this.entity.mediumTags

    if (!mediumTags || mediumTags.length === 0) {
      return 'unknown medium'
    }

    if (mediumTags.length === 1) {
      return mediumTags[0].label
    }

    if (mediumTags.length === 2) {
      return mediumTags[0].label + ' / ' + mediumTags[1].label
    }

    return 'mixed media'
  }

  createEventOccurrenceDescriptionOn (dateStr) {
    return eventLib.formatEventOccurrenceForDisplay(
      this.entity.occurrenceType,
      this.entity.eventType,
      this.entity.dateFrom,
      this.entity.dateTo,
      this.entity.additionalPerformances,
      dateStr
    )
  }

  createCostDescription () {
    return eventLib.formatCostForDisplay(
      this.entity.costType,
      this.entity.costFrom,
      this.entity.costTo
    )
  }

  createBookingDescriptionOn (dateStr) {
    return eventLib.formatBookingInfoForDisplay(
      this.entity.bookingType,
      this.entity.bookingOpens,
      this,
      dateStr
    )
  }

  createTimesDetailsOn (dateStr) {
    return timeLib.getTimesDetails(this.entity, this.entityType, dateStr)
  }

  createFormattedDescription () {
    if (this.entity.description) {
      return entityLib.processDescription(
        this.entity.description,
        this.entity.descriptionCredit
      )
    } else {
      return this.entity.summary
    }
  }

  createVenueGuidanceDescription () {
    return this.entity.venueGuidance
  }

  createAgeDescription () {
    return this.entity.minAge ? `${this.entity.minAge}+` : null
  }

  getPin () {
    return this.venue.pin
  }

  get hasVenueGuidance () {
    return !!this.entity.venueGuidance
  }

  get hasEventSeries () {
    return !!this.eventSeries
  }

  get hasTalents () {
    return !!this.talents && this.talents.length > 0
  }

  get hasTags () {
    return !!this.tags && this.tags.length > 0
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

  createShallowClone (newProps) {
    const clonedEntity = Object.assign({}, this.entity, newProps || {})
    return new FullEvent(clonedEntity)
  }

  getLinkByType (linkType) {
    return this.links.getLinkByType(linkType)
  }

  getHomepageUrl () {
    const homepage = this.getLinkByType(linkType.HOMEPAGE)
    return homepage ? homepage.url : null
  }
}

function _addTagType (tags, tagType) {
  return (tags || []).map(tag => {
    tag.type = tagType
    return tag
  })
}
