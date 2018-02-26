import statusType from '_src/domain/types/status-type'
import { entityMapper } from '_src/modules/entity'
import * as eventLib from '_src/shared/lib/event'

export function getInitialValues (event) {
  if (event.isNew()) {
    return {
      id: null,
      status: statusType.ACTIVE,
      validStatuses: entityMapper.getValidStatusesInitialValue(),
      name: '',
      eventType: '',
      occurrenceType: '',
      dateFrom: null,
      dateTo: null,
      soldOut: false,
      costType: '',
      costFrom: '',
      costTo: '',
      bookingType: '',
      bookingOpens: null,
      summary: '',
      rating: '3',
      minAge: '',
      maxAge: '',
      eventSeries: {},
      venue: {},
      venueGuidance: '',
      useVenueOpeningTimes: false,
      timesRanges: [],
      openingTimes: [],
      additionalOpeningTimes: [],
      specialOpeningTimes: [],
      openingTimesClosures: [],
      performances: [],
      additionalPerformances: [],
      specialPerformances: [],
      performancesClosures: [],
      duration: '',
      talents: [],
      audienceTags: [],
      mediumTags: [],
      styleTags: [],
      geoTags: [],
      reviews: [],
      soldOutPerformances: [],
      description: entityMapper.getRichTextInitialValue(),
      descriptionCredit: '',
      links: [],
      images: [],
      weSay: '',
      version: 0
    }
  }

  const isPaid = eventLib.eventIsPaid(event.costType)
  const bookingIsRequired = eventLib.bookingRequired(event.bookingType)
  const hasOccurrenceRange = eventLib.occurrenceHasDateRange(
    event.occurrenceType
  )

  return {
    id: event.id,
    status: event.status,
    validStatuses: entityMapper.getValidStatusesInitialValue(event.status),
    eventType: event.eventType,
    name: event.name,
    occurrenceType: event.occurrenceType,
    dateFrom: hasOccurrenceRange ? event.dateFrom : null,
    dateTo: hasOccurrenceRange ? event.dateTo : null,
    soldOut: !!event.soldOut,
    costType: event.costType,
    costFrom: isPaid ? event.costFrom.toFixed(2) : '',
    costTo: isPaid ? event.costTo.toFixed(2) : '',
    bookingType: event.bookingType,
    bookingOpens: bookingIsRequired ? event.bookingOpens : null,
    summary: event.summary,
    rating: event.rating.toString(),
    minAge: event.minAge ? event.minAge.toString() : '',
    maxAge: event.maxAge ? event.maxAge.toString() : '',
    eventSeries: event.eventSeries
      ? {
        entityType: event.eventSeries.entityType,
        eventSeriesType: event.eventSeries.eventSeriesType,
        id: event.eventSeries.id,
        name: event.eventSeries.name
      }
      : {},
    venue: event.venue
      ? {
        entityType: event.venue.entityType,
        status: event.venue.status,
        venueType: event.venue.venueType,
        id: event.venue.id,
        name: event.venue.name,
        address: event.venue.address,
        postcode: event.venue.postcode
      }
      : {},
    venueGuidance: event.venueGuidance || '',
    useVenueOpeningTimes: !!event.useVenueOpeningTimes,
    timesRanges: entityMapper.getTimesRangesInitialValue(event.timesRanges),
    openingTimes: entityMapper.getOpeningTimesInitialValue(event.openingTimes),
    additionalOpeningTimes: entityMapper.getAdditionalOpeningTimesInitialValue(
      event.additionalOpeningTimes
    ),
    specialOpeningTimes: entityMapper.getSpecialOpeningTimesInitialValue(
      event.specialOpeningTimes
    ),
    openingTimesClosures: entityMapper.getOpeningTimesClosuresInitialValue(
      event.openingTimesClosures
    ),
    performances: entityMapper.getPerformancesInitialValue(event.performances),
    additionalPerformances: entityMapper.getAdditionalPerformancesInitialValue(
      event.additionalPerformances
    ),
    specialPerformances: entityMapper.getSpecialPerformancesInitialValue(
      event.specialPerformances
    ),
    performancesClosures: entityMapper.getPerformancesClosuresInitialValue(
      event.performancesClosures
    ),
    duration: event.duration || '',
    talents: _getTalentsInitialValue(event.talents),
    audienceTags: event.audienceTags || [],
    mediumTags: event.mediumTags || [],
    styleTags: event.styleTags || [],
    geoTags: event.geoTags || [],
    reviews: event.reviews || [],
    soldOutPerformances: entityMapper.getSoldOutPerformancesInitialValue(
      event.soldOutPerformances
    ),
    description: entityMapper.getRichTextInitialValue(event.description),
    descriptionCredit: event.descriptionCredit || '',
    links: entityMapper.getLinksInitialValue(event.links),
    images: entityMapper.getImagesInitialValue(event.images),
    weSay: event.weSay || '',
    version: event.version
  }
}

// TODO move somewhere else?
function _getTalentsInitialValue (talents) {
  return (talents || []).map(talent => ({
    ...talent,
    key: talent.id,
    roles: (talent.roles || []).join(', '),
    characters: (talent.characters || []).join(', ')
  }))
}

export function mapSubmittedValues (values) {
  return {
    status: values.status,
    name: values.name.trim(),
    description: entityMapper.mapSubmittedDescription(values.description),
    descriptionCredit: values.descriptionCredit.trim(),
    links: entityMapper.mapSubmittedLinks(values.links),
    images: entityMapper.mapSubmittedImages(values.images),
    weSay: (values.weSay || '').trim(),
    version: values.version + 1
  }
}
