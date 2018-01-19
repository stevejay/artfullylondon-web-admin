import { LinkCollection } from '_src/entities/link-collection'
import * as entityConstants from '_src/constants/entity'
import * as linkConstants from '_src/constants/link'
import * as venueLib from '_src/lib/venue'
import * as entityLib from '_src/lib/entity'
import * as timeLib from '_src/lib/time'
import * as imageLib from '_src/lib/image'

export class SummaryVenue {
  constructor (entity) {
    /* istanbul ignore if */
    if (!entity) {
      throw new Error('null or undefined entity')
    }

    this.entity = entity
    this.postcodeDistrict = venueLib.getPostcodeDistrict(entity.postcode)
  }

  get entityType () {
    return entityConstants.ENTITY_TYPE_VENUE
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
    return prefix + ' this venue'
  }

  createFullAddress () {
    return venueLib.formatAddressForDisplay(
      this.entity.address,
      this.entity.postcode
    )
  }

  createVenuesMapIconUrl (isSelected) {
    return imageLib.createVenueTypePngIconUrl(this.venueType, isSelected)
  }

  shallowClone (newProps) {
    const clonedEntity = Object.assign({}, this.entity, newProps || {})
    return new SummaryVenue(clonedEntity)
  }
}

export class FullVenue extends SummaryVenue {
  constructor (entity) {
    super(entity)
    this.links = new LinkCollection(entity.links)
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

  createInfoBarLabel () {
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

  get description () {
    return this.entity.description
  }

  get descriptionCredit () {
    return this.entity.descriptionCredit
  }

  get weSay () {
    return this.entity.weSay
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

  get isFullEntity () {
    return true
  }

  shallowClone (newProps) {
    const clonedEntity = Object.assign({}, this.entity, newProps || {})
    return new FullVenue(clonedEntity)
  }

  getLinkByType (linkType) {
    return this.links.getLinkByType(linkType)
  }

  getHomepageUrl () {
    const homepage = this.getLinkByType(linkConstants.LINK_TYPE_HOMEPAGE)
    return homepage ? homepage.url : null
  }
}
