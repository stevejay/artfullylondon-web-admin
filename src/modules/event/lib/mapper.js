import statusType from '_src/domain/types/status-type'
import { entityMapper } from '_src/modules/entity'
import * as eventLib from '_src/shared/lib/event'

export function getInitialValues (event) {
  const isPaid = eventLib.eventIsPaid(event.costType)
  const bookingIsRequired = eventLib.bookingRequired(event.bookingType)
  const hasOccurrenceRange = eventLib.occurrenceHasDateRange(
    event.occurrenceType
  )

  return {
    id: event.id || null,
    status: event.status || statusType.ACTIVE,
    validStatuses: entityMapper.getValidStatusesInitialValue(event.status),
    eventType: event.eventType || '',
    name: event.name || '',
    occurrenceType: event.occurrenceType || '',
    dateFrom: hasOccurrenceRange ? event.dateFrom : null,
    dateTo: hasOccurrenceRange ? event.dateTo : null,
    soldOut: !!event.soldOut,
    costType: event.costType || '',
    costFrom: isPaid ? event.costFrom.toFixed(2) : '',
    costTo: isPaid ? event.costTo.toFixed(2) : '',
    bookingType: event.bookingType || '',
    bookingOpens: bookingIsRequired ? event.bookingOpens : null,
    summary: event.summary || '',
    rating: event.rating ? event.rating.toString() : '3',
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
    version: event.version || 0
  }
}

// TODO move to the talent/entity module?
function _getTalentsInitialValue (talents) {
  return (talents || []).map(talent => ({
    ...talent,
    key: talent.id,
    roles: (talent.roles || []).join(', '),
    characters: (talent.characters || []).join(', ')
  }))
}

export function mapSubmittedValues (values) {
  const isFree = !eventLib.eventIsPaid(values.costType)
  const costFrom = isFree ? null : parseFloat(values.costFrom)
  const costTo = isFree ? null : parseFloat(values.costTo)

  const bookingNotRequired = !eventLib.bookingRequired(values.bookingType)
  const bookingOpens = bookingNotRequired ? null : values.bookingOpens
  const hasOccurrenceRange = eventLib.occurrenceHasDateRange(
    values.occurrenceType
  )

  return {
    status: values.status,
    name: values.name.trim(),
    eventType: values.eventType,
    occurrenceType: values.occurrenceType,
    dateFrom: hasOccurrenceRange ? values.dateFrom : null,
    dateTo: hasOccurrenceRange ? values.dateTo : null,
    summary: values.summary.trim(),
    costType: values.costType,
    costFrom: costFrom,
    costTo: costTo,
    bookingType: values.bookingType,
    bookingOpens: bookingOpens,
    venueId: values.venue.id,
    venueGuidance: values.venueGuidance.trim(),
    eventSeriesId: values.eventSeries.id || null,
    duration: values.duration.trim(),
    useVenueOpeningTimes: values.useVenueOpeningTimes,
    timesRanges: entityMapper.mapSubmittedTimesRanges(values.timesRanges),
    openingTimes: entityMapper.mapSubmittedOpeningTimes(values.openingTimes),
    additionalOpeningTimes: entityMapper.mapSubmittedAdditionalOpeningTimes(
      values.additionalOpeningTimes
    ),
    specialOpeningTimes: entityMapper.mapSubmittedSpecialOpeningTimes(
      values.specialOpeningTimes
    ),
    openingTimesClosures: entityMapper.mapSubmittedOpeningTimesClosures(
      values.openingTimesClosures
    ),
    performances: entityMapper.mapSubmittedPerformances(values.performances),
    additionalPerformances: entityMapper.mapSubmittedAdditionalPerformances(
      values.additionalPerformances
    ),
    specialPerformances: entityMapper.mapSubmittedSpecialPerformances(
      values.specialPerformances
    ),
    performancesClosures: entityMapper.mapSubmittedPerformancesClosures(
      values.performancesClosures
    ),
    talents: entityMapper.mapSubmittedEventTalents(values.talents),
    mediumTags: values.mediumTags,
    styleTags: values.styleTags,
    audienceTags: values.audienceTags,
    geoTags: values.geoTags,
    weSay: (values.weSay || '').trim(),
    rating: parseInt(values.rating),
    minAge: values.minAge ? parseInt(values.minAge) : null,
    // namedClosures: entityMapper.mapSubmittedNamedClosures(values.namedClosures),
    description: entityMapper.mapSubmittedDescription(values.description),
    descriptionCredit: values.descriptionCredit.trim(),
    links: entityMapper.mapSubmittedLinks(values.links),
    images: entityMapper.mapSubmittedImages(values.images),
    version: values.version + 1
  }
}
