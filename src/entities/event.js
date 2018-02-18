import { LinkCollection } from '_src/entities/link-collection'
import { EventSummaryTalent } from '_src/entities/talent'
import { SummaryVenue } from '_src/entities/venue'
import { SummaryEventSeries } from '_src/entities/event-series'
import entityType from '_src/entities/types/entity-type'
import linkType from '_src/entities/types/link-type'
import costType from '_src/entities/types/cost-type'
import { constants as tagConstants } from '_src/modules/tag'
import * as entityLib from '_src/lib/entity'
import * as venueLib from '_src/lib/venue'
import * as timeLib from '_src/lib/time'
import * as eventLib from '_src/lib/event'

export class SummaryEvent {
  constructor (entity) {
    this.entity = entity || {}
    this.postcodeDistrict = venueLib.getPostcodeDistrict(this.entity.postcode)
    this.groupedDates = eventLib.groupTimesByDate(this.entity.dates)
  }

  get entityType () {
    return entityType.EVENT
  }

  get entityTypeLabel () {
    return this.isFreeEvent ? 'Free Event' : 'Event'
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

  get isFreeEvent () {
    return this.entity.costType === costType.FREE
  }

  get url () {
    return entityLib.createEntityUrl(this.entityType, this.id)
  }

  get editUrl () {
    return entityLib.createEntityEditUrl(this.entityType, this.id)
  }

  get summary () {
    return this.entity.summary
  }

  get venueId () {
    return this.entity.venueId
  }

  get venueName () {
    return this.entity.venueName
  }

  get postcode () {
    return this.entity.postcode
  }

  get hasDates () {
    return !!this.entity.dates && this.entity.dates.length > 0
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

  get cardImageLoaded () {
    return !!this.entity.cardImageLoaded
  }

  isBeingWatched (watches) {
    return !!watches[this.id]
  }

  createWatchLabel () {
    return this.name
  }

  createWatchChangeInstruction (isBeingWatched) {
    const prefix = isBeingWatched ? 'Unbookmark' : 'Bookmark'
    return prefix + ' this event'
  }

  isExpiredOn (dateStr) {
    return dateStr > this.entity.dateTo
  }

  createDateRangeLabel (dateStr) {
    return timeLib.createDateRangeLabel(
      dateStr,
      this.entity.dateFrom,
      this.entity.dateTo
    )
  }

  isCurrent (dateStr) {
    return (
      !this.entity.dateFrom ||
      (this.entity.dateFrom <= dateStr && this.entity.dateTo >= dateStr)
    )
  }

  shallowClone (newProps) {
    const clonedEntity = Object.assign({}, this.entity, newProps || {})
    return new SummaryEvent(clonedEntity)
  }
}

export class FullEvent extends SummaryEvent {
  constructor (entity) {
    super(entity)

    this.links = new LinkCollection(this.entity.links)

    this.venue = new SummaryVenue(this.entity.venue)

    this.talents = (this.entity.talents || [])
      .map(talent => new EventSummaryTalent(talent))

    this.eventSeries = this.entity.eventSeries
      ? new SummaryEventSeries(this.entity.eventSeries)
      : null

    this.tags = [
      ..._addTagType(this.entity.mediumTags, tagConstants.TAG_TYPE_MEDIUM),
      ..._addTagType(this.entity.styleTags, tagConstants.TAG_TYPE_STYLE),
      ..._addTagType(this.entity.geoTags, tagConstants.TAG_TYPE_GEO),
      ..._addTagType(this.entity.audienceTags, tagConstants.TAG_TYPE_AUDIENCE)
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
      this.links,
      dateStr
    )
  }

  createTimesDescriptionForDate (dateStr, timeStr, namedClosuresLookup) {
    return timeLib.formatTimesStringForGivenDate(
      this.entity,
      dateStr,
      timeStr,
      namedClosuresLookup
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

  get pin () {
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

  shallowClone (newProps) {
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
