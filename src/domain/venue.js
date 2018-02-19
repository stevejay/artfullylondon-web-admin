import _ from 'lodash'

import * as venueLib from '_src/lib/venue'
import * as timeLib from '_src/lib/time'
import { Entity } from '_src/domain/entity'
import entityType from '_src/domain/types/entity-type'
import linkType from '_src/domain/types/link-type'

const NEWLINES_REGEX = /\n/g

export class FullVenue extends Entity {
  get entityType () {
    return entityType.VENUE
  }

  getInfoBarLabel () {
    return this.venueType
  }

  getUrl () {
    throw new Error('url accessed')
  }

  getEditUrl () {
    return `/venue/edit/${this.id}`
  }

  getPin () {
    return {
      lat: this.latitude,
      lng: this.longitude
    }
  }

  getHomepageUrl () {
    const homepage = this.getLinkByType(linkType.HOMEPAGE)
    return homepage ? homepage.url : null
  }

  createTimesDetailsOn (dateStr) {
    return timeLib.getTimesDetails(this, entityType.VENUE, dateStr)
  }

  createFullAddress () {
    return (
      this.address.replace(NEWLINES_REGEX, ', ') +
      (this.postcode ? ', ' + this.postcode : '')
    )
  }

  createShallowClone (newProps) {
    return new FullVenue({ ...this, ...newProps })
  }
}

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
    return {
      lat: this.latitude,
      lng: this.longitude
    }
  }

  hasImage () {
    return !!this.image
  }

  createFullAddress () {
    return (
      this.address.replace(NEWLINES_REGEX, ', ') +
      (this.postcode ? ', ' + this.postcode : '')
    )
  }

  createShallowClone (newProps) {
    return new SummaryVenue({ ...this, ...newProps })
  }
}
