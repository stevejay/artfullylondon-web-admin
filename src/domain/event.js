import _ from 'lodash'

import { Entity } from '_src/domain/entity'
import { EventSummaryTalent } from '_src/domain/talent'
import { SummaryVenue } from '_src/domain/venue'
import { SummaryEventSeries } from '_src/domain/event-series'
import entityType from '_src/domain/types/entity-type'
import linkType from '_src/domain/types/link-type'
import costType from '_src/domain/types/cost-type'
import tagType from '_src/domain/types/tag-type'
import * as venueLib from '_src/shared/lib/venue'
import * as timeLib from '_src/shared/lib/time'
import * as eventLib from '_src/shared/lib/event'

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

  get entityType () {
    return entityType.EVENT
  }

  getEditUrl () {
    return `/event/edit/${this.id}`
  }

  getInfoBarLabel () {
    // TODO mixed visual arts, and mixed performing arts

    if (!this.mediumTags || this.mediumTags.length === 0) {
      return 'unknown medium'
    }

    if (this.mediumTags.length === 1) {
      return this.mediumTags[0].label
    }

    if (this.mediumTags.length === 2) {
      return this.mediumTags[0].label + ' / ' + this.mediumTags[1].label
    }

    return 'mixed media'
  }

  createEventOccurrenceDescriptionOn (dateStr) {
    return eventLib.formatEventOccurrenceForDisplay(
      this.occurrenceType,
      this.eventType,
      this.dateFrom,
      this.dateTo,
      this.additionalPerformances,
      dateStr
    )
  }

  createCostDescription () {
    return eventLib.formatCostForDisplay(
      this.costType,
      this.costFrom,
      this.costTo
    )
  }

  createBookingDescriptionOn (dateStr) {
    return eventLib.formatBookingInfoForDisplay(
      this.bookingType,
      this.bookingOpens,
      this,
      dateStr
    )
  }

  createTimesDetailsOn (dateStr) {
    return timeLib.getTimesDetails(this, this.entityType, dateStr)
  }

  createAgeDescription () {
    return this.minAge ? `${this.minAge}+` : null
  }

  getPin () {
    return this.venue.getPin()
  }

  hasEventSeries () {
    return !!this.eventSeries
  }

  hasTalents () {
    return !!this.talents && this.talents.length > 0
  }

  hasTags () {
    return !!this.tags && this.tags.length > 0
  }

  isExpiredOn (dateStr) {
    return dateStr > this.dateTo
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
