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

  get url () {
    throw new Error('url accessed')
  }

  get editUrl () {
    return `/venue/edit/${this.id}`
  }

  get pin () {
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

  shallowClone (newProps) {
    return new FullVenue({ ...this, ...newProps })
  }
}

export class SummaryVenue {
  constructor (entity) {
    _.extend(this, entity)
  }

  getPostcodeDistrict () {
    return venueLib.getPostcodeDistrict(this.postcode)
  }

  get entityTypeLabel () {
    return 'Venue'
  }

  get key () {
    return this.id
  }

  get url () {
    return `/venue/${this.id}`
  }

  get pin () {
    return {
      lat: this.latitude,
      lng: this.longitude
    }
  }

  get hasImage () {
    return !!this.image
  }

  createFullAddress () {
    return (
      this.address.replace(NEWLINES_REGEX, ', ') +
      (this.postcode ? ', ' + this.postcode : '')
    )
  }

  shallowClone (newProps) {
    return new SummaryVenue({ ...this, ...newProps })
  }
}
