import * as entityConstants from '_src/constants/entity'
import * as dateLib from '_src/lib/date'
import { entityMapper } from '_src/modules/entity'
import { DEFAULT_MAP_CENTER } from '_src/modules/location'

export function getInitialValues (venue) {
  if (venue.isNew) {
    return {
      id: null,
      status: entityConstants.ACTIVE_STATUS,
      validStatuses: entityMapper.getValidStatusesInitialValue(),
      name: '',
      venueType: '',
      address: '',
      pin: {
        lat: null,
        lng: null
      },
      defaultCenter: DEFAULT_MAP_CENTER,
      postcode: '',
      email: '',
      telephone: '',
      wheelchairAccessType: '',
      disabledBathroomType: '',
      hearingFacilitiesType: '',
      hasPermanentCollection: false,
      openingTimes: [],
      additionalOpeningTimes: [],
      openingTimesClosures: [],
      namedClosures: '',
      notes: '',
      description: entityMapper.getRichTextInitialValue(),
      descriptionCredit: null,
      links: [],
      images: [],
      weSay: '',
      version: 0,
      createdDate: null
    }
  }

  return {
    id: venue.id,
    status: venue.status,
    validStatuses: entityMapper.getValidStatusesInitialValue(venue.status),
    name: venue.name,
    venueType: venue.venueType,
    address: venue.address,
    pin: {
      lat: venue.latitude,
      lng: venue.longitude
    },
    defaultCenter: {
      lat: venue.latitude,
      lng: venue.longitude
    },
    postcode: venue.postcode,
    email: venue.email || '',
    telephone: venue.telephone || '',
    wheelchairAccessType: venue.wheelchairAccessType,
    disabledBathroomType: venue.disabledBathroomType,
    hearingFacilitiesType: venue.hearingFacilitiesType,
    hasPermanentCollection: venue.hasPermanentCollection,
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
    links: entityMapper.getLinksInitialValue(venue.links.links),
    images: entityMapper.getImagesInitialValue(venue.images),
    weSay: venue.weSay || '',
    notes: venue.notes || '',
    version: venue.version,
    createdDate: venue.createdDate
  }
}

export function mapSubmittedValues (values) {
  // TODO this should be driven by the db:
  const dbDate = dateLib.getDateNowForDatabase()

  console.log('mapSubmitted Vaoues', values)

  return {
    name: values.name.trim(),
    description: entityMapper.mapSubmittedDescription(values.description),
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
    namedClosures: values.namedClosures
      ? values.namedClosures.split(',')
      : null,
    links: entityMapper.mapSubmittedLinks(values.links),
    images: entityMapper.mapSubmittedImages(values.images),
    weSay: values.weSay.trim(),
    notes: values.notes.trim(),
    version: values.version + 1,
    createdDate: values.createdDate || dbDate,
    updatedDate: dbDate
  }
}
