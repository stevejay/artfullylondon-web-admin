import _ from 'lodash'

import * as venueLib from '_src/shared/lib/venue'
import * as timeLib from '_src/shared/lib/time'
import { Entity } from '_src/domain/entity'
import entityType from '_src/domain/types/entity-type'
import linkType from '_src/domain/types/link-type'

const NEWLINES_REGEX = /\n/g

export class SummaryVenue {
  constructor (entity) {
    _.extend(this, entity)
  }

  get key () {
    return this.id
  }

  getPostcodeDistrict () {
    return venueLib.getPostcodeDistrict(this.postcode)
  }

  getEntityTypeLabel () {
    return 'Venue'
  }

  getUrl () {
    return `/venue/${this.id}`
  }

  getPin () {
    return _getPin(this)
  }

  hasImage () {
    return !!this.image
  }

  createFullAddress () {
    return _createFullAddress(this)
  }
}

export class FullVenue extends Entity {
  get entityType () {
    return entityType.VENUE
  }

  getInfoBarLabel () {
    return this.venueType
  }

  getEditUrl () {
    return `/venue/edit/${this.id}`
  }

  getPin () {
    return _getPin(this)
  }

  getHomepageUrl () {
    const homepage = this.getLinkByType(linkType.HOMEPAGE)
    return homepage ? homepage.url : null
  }

  createTimesDetailsOn (dateStr) {
    return timeLib.getTimesDetails(this, entityType.VENUE, dateStr)
  }

  createFullAddress () {
    return _createFullAddress(this)
  }
}

function _createFullAddress (entity) {
  return (
    entity.address.replace(NEWLINES_REGEX, ', ') +
    (entity.postcode ? ', ' + entity.postcode : '')
  )
}

function _getPin (entity) {
  return {
    lat: entity.latitude,
    lng: entity.longitude
  }
}
