import _ from 'lodash'

import { entityMapper } from '_src/modules/entity'
import { DEFAULT_MAP_CENTER } from '_src/modules/location'
import statusType from '_src/domain/types/status-type'

export function getInitialValues (venue) {
  return {
    id: venue.id || null,
    status: venue.status || statusType.ACTIVE,
    validStatuses: entityMapper.getValidStatusesInitialValue(venue.status),
    name: venue.name || '',
    venueType: venue.venueType || '',
    address: venue.address || '',
    pin: {
      lat: venue.latitude || null,
      lng: venue.longitude || null
    },
    defaultCenter: _.isNil(venue.latitude) || _.isNil(venue.longitude)
      ? DEFAULT_MAP_CENTER
      : {
        lat: venue.latitude,
        lng: venue.longitude
      },
    postcode: venue.postcode || '',
    email: venue.email || '',
    telephone: venue.telephone || '',
    wheelchairAccessType: venue.wheelchairAccessType || '',
    disabledBathroomType: venue.disabledBathroomType || '',
    hearingFacilitiesType: venue.hearingFacilitiesType || '',
    hasPermanentCollection: !!venue.hasPermanentCollection,
    openingTimes: entityMapper.getOpeningTimesInitialValue(venue.openingTimes),
    additionalOpeningTimes: entityMapper.getAdditionalOpeningTimesInitialValue(
      venue.additionalOpeningTimes
    ),
    openingTimesClosures: entityMapper.getOpeningTimesClosuresInitialValue(
      venue.openingTimesClosures
    ),
    namedClosures: entityMapper.getNamedClosuresInitialValue(
      venue.namedClosures
    ),
    description: entityMapper.getRichTextInitialValue(venue.description),
    descriptionCredit: venue.descriptionCredit || '',
    links: entityMapper.getLinksInitialValue(venue.links),
    images: entityMapper.getImagesInitialValue(venue.images),
    weSay: venue.weSay || '',
    notes: venue.notes || '',
    version: venue.version || 0
  }
}

export function mapSubmittedValues (values) {
  return {
    name: values.name.trim(),
    description: entityMapper.mapSubmittedDescription(values.description),
    descriptionCredit: values.descriptionCredit.trim(),
    status: values.status,
    venueType: values.venueType,
    address: values.address.trim(),
    postcode: values.postcode.trim().toUpperCase(),
    latitude: values.pin.lat,
    longitude: values.pin.lng,
    wheelchairAccessType: values.wheelchairAccessType,
    disabledBathroomType: values.disabledBathroomType,
    hearingFacilitiesType: values.hearingFacilitiesType,
    hasPermanentCollection: values.hasPermanentCollection,
    email: values.email.trim(),
    telephone: values.telephone.trim(),
    openingTimes: entityMapper.mapSubmittedOpeningTimes(values.openingTimes),
    additionalOpeningTimes: entityMapper.mapSubmittedAdditionalOpeningTimes(
      values.additionalOpeningTimes
    ),
    openingTimesClosures: entityMapper.mapSubmittedOpeningTimesClosures(
      values.openingTimesClosures
    ),
    namedClosures: entityMapper.mapSubmittedNamedClosures(values.namedClosures),
    links: entityMapper.mapSubmittedLinks(values.links),
    images: entityMapper.mapSubmittedImages(values.images),
    weSay: values.weSay.trim(),
    notes: values.notes.trim(),
    version: values.version + 1
  }
}
