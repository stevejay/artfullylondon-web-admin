import { LinkCollection } from '_src/entities/link-collection'
import linkType from '_src/entities/link-type'
import * as venueLib from '_src/lib/venue'
import * as entityLib from '_src/lib/entity'
import * as timeLib from '_src/lib/time'
import entityType from '_src/entities/entity-type'
import venueType from '_src/entities/venue-type'

const NEWLINES_REGEX = /\n/g

export class SummaryVenue {
  constructor (entity) {
    this.entity = entity || {}
    this.postcodeDistrict = venueLib.getPostcodeDistrict(this.entity.postcode)
  }

  get entityType () {
    return entityType.VENUE
  }

  get entityTypeLabel () {
    return 'Venue'
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

  get venueType () {
    return this.entity.venueType
  }

  get postcode () {
    return this.entity.postcode
  }

  get url () {
    return entityLib.createEntityUrl(this.entityType, this.id)
  }

  get editUrl () {
    return entityLib.createEntityEditUrl(this.entityType, this.id)
  }

  get latitude () {
    return this.entity.latitude
  }

  get longitude () {
    return this.entity.longitude
  }

  get pin () {
    return {
      lat: this.latitude,
      lng: this.longitude
    }
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
    const prefix = isBeingWatched ? 'Unwatch' : 'Watch'
    return prefix + ' this venue'
  }

  createFullAddress () {
    return (
      this.entity.address.replace(NEWLINES_REGEX, ', ') +
      ', ' +
      this.entity.postcode
    )
  }

  createVenuesMapIconUrl (isSelected) {
    let imageName = 'townhouse'

    switch (this.venueType) {
      case venueType.THEATRE:
        imageName = 'theater'
        break
      case venueType.ART_GALLERY:
        imageName = 'artgallery'
        break
      case venueType.MUSEUM:
        imageName = 'museum'
        break
    }

    return (
      process.env.WEBSITE_SITE_IMAGES_ROOT_URL +
      `/${imageName}${isSelected ? '-selected' : ''}.png`
    )
  }

  shallowClone (newProps) {
    const clonedEntity = Object.assign({}, this.entity, newProps || {})
    return new SummaryVenue(clonedEntity)
  }
}

export class FullVenue extends SummaryVenue {
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

  getInfoBarLabel () {
    return this.venueType
  }

  createFormattedDescription () {
    return entityLib.processDescription(
      this.entity.description,
      this.entity.descriptionCredit
    )
  }

  get images () {
    return this.entity.images
  }

  get links () {
    return this._links
  }

  get address () {
    return this.entity.address
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

  get notes () {
    return this.entity.notes
  }

  get email () {
    return this.entity.email
  }

  get telephone () {
    return this.entity.telephone
  }

  get wheelchairAccessType () {
    return this.entity.wheelchairAccessType
  }

  get disabledBathroomType () {
    return this.entity.disabledBathroomType
  }

  get hearingFacilitiesType () {
    return this.entity.hearingFacilitiesType
  }

  get hasPermanentCollection () {
    return this.entity.hasPermanentCollection
  }

  get openingTimes () {
    return this.entity.openingTimes
  }

  get additionalOpeningTimes () {
    return this.entity.additionalOpeningTimes
  }

  get openingTimesClosures () {
    return this.entity.openingTimesClosures
  }

  get namedClosures () {
    return this.entity.namedClosures
  }

  shallowClone (newProps) {
    const clonedEntity = Object.assign({}, this.entity, newProps || {})
    return new FullVenue(clonedEntity)
  }

  getLinkByType (linkType) {
    return this.links.getLinkByType(linkType)
  }

  getHomepageUrl () {
    const homepage = this.getLinkByType(linkType.HOMEPAGE)
    return homepage ? homepage.url : null
  }
}
