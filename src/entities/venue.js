import { ENTITY_TYPE_VENUE } from '_src/constants/entity'
import { LinkCollection } from '_src/entities/link-collection'
import * as sharedVenue from '_src/lib/venue'
import * as sharedEntity from '_src/lib/entity'
import { LINK_TYPE_HOMEPAGE } from '_src/constants/link'
import * as time from '_src/lib/time'
import * as image from '_src/lib/image'

export class SummaryVenue {
  constructor (entity) {
    if (!entity) {
      throw new Error('null or undefined entity')
    }

    this.entity = entity
    this.postcodeDistrict = sharedVenue.getPostcodeDistrict(entity.postcode)
  }

  get entityType () {
    return ENTITY_TYPE_VENUE
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
    return sharedEntity.createEntityUrl(this.entityType, this.id)
  }

  get editUrl () {
    return sharedEntity.createEntityEditUrl(this.entityType, this.id)
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
    return sharedVenue.formatAddressForDisplay(
      this.entity.address,
      this.entity.postcode
    )
  }

  createVenuesMapIconUrl (isSelected) {
    return image.createVenueTypePngIconUrl(this.venueType, isSelected)
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
    return time.formatTimesStringForGivenDate(
      this.entity,
      dateStr,
      timeStr,
      namedClosuresLookup
    )
  }

  createTimesDetailsOn (dateStr) {
    return time.getTimesDetails(this.entity, this.entityType, dateStr)
  }

  createInfoBarLabel () {
    return this.venueType
  }

  createFormattedDescription () {
    return sharedEntity.processDescription(
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
    const homepage = this.getLinkByType(LINK_TYPE_HOMEPAGE)
    return homepage ? homepage.url : null
  }
}
