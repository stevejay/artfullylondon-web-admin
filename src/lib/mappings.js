import RichTextEditor from 'react-rte'

import * as imageLib from '_src/lib/image'
import * as dateLib from '_src/lib/date'
import * as eventLib from '_src/lib/event'
import * as entityLib from '_src/lib/entity'
import * as talentLib from '_src/lib/talent'

// TODO maybe make part of domain
const IMAGE_STATUS_PROCESSING = 'Processing'

export function normaliseEventValues (values) {
  const isPerformance = eventLib.eventIsPerformance(values.eventType)
  const isExhibition = !isPerformance

  const isOneTimePerformance =
    isPerformance && eventLib.eventIsOneTime(values.occurrenceType)

  const hasRange = eventLib.occurrenceTypeHasDateRange(values.occurrenceType)

  if (hasRange) {
    if (values.dateFrom > values.dateTo) {
      values.dateTo = values.dateFrom
    }

    values.additionalOpeningTimes = (values.additionalOpeningTimes || [])
      .filter(x => _filterTimeEntries(x, values.dateFrom, values.dateTo))

    values.additionalPerformances = (values.additionalPerformances || [])
      .filter(x => _filterTimeEntries(x, values.dateFrom, values.dateTo))

    values.specialOpeningTimes = (values.specialOpeningTimes || [])
      .filter(x => _filterTimeEntries(x, values.dateFrom, values.dateTo))

    values.specialPerformances = (values.specialPerformances || [])
      .filter(x => _filterTimeEntries(x, values.dateFrom, values.dateTo))

    values.openingTimesClosures = (values.openingTimesClosures || [])
      .filter(x => _filterTimeEntries(x, values.dateFrom, values.dateTo))

    values.performancesClosures = (values.performancesClosures || [])
      .filter(x => _filterTimeEntries(x, values.dateFrom, values.dateTo))
  } else {
    values.dateTo = values.dateFrom = null
  }

  const isSingleDay =
    isOneTimePerformance || (hasRange && values.dateFrom === values.dateTo)

  const isLongerThanWeek =
    hasRange && dateLib.periodIsLongerThanWeek(values.dateFrom, values.dateTo)

  values.useVenueOpeningTimes = isExhibition && values.useVenueOpeningTimes

  if (isExhibition) {
    values.performances = []
    values.additionalPerformances = []
    values.specialPerformances = []
    values.performancesClosures = []

    if (isSingleDay || !isLongerThanWeek || values.useVenueOpeningTimes) {
      values.openingTimes = []
    }

    if (
      isSingleDay ||
      !isLongerThanWeek ||
      values.useVenueOpeningTimes ||
      !hasRange
    ) {
      values.timesRanges = []
    }

    if (isSingleDay) {
      values.openingTimesClosures = []
    }

    if (values.timesRanges.length === 0) {
      values.openingTimes = values.openingTimes.map(openingTime => {
        if (openingTime.timesRangeId) {
          delete openingTime.timesRangeId
        }

        return openingTime
      })
    }
  } else {
    values.useVenueOpeningTimes = false
    values.openingTimes = []
    values.additionalOpeningTimes = []
    values.specialOpeningTimes = []
    values.openingTimesClosures = []

    if (isSingleDay || !isLongerThanWeek || isOneTimePerformance) {
      values.performances = []
    }

    if (isSingleDay || !isLongerThanWeek || isOneTimePerformance || !hasRange) {
      values.timesRanges = []
    }

    if (isOneTimePerformance && values.additionalPerformances.length > 1) {
      values.additionalPerformances = values.additionalPerformances.slice(0, 1)
    }

    if (isSingleDay || isOneTimePerformance) {
      values.performancesClosures = []
    }

    if (values.timesRanges.length === 0) {
      values.performances = values.performances.map(performance => {
        if (performance.timesRangeId) {
          delete performance.timesRangeId
        }

        return performance
      })
    }
  }
}

export function mapVenueToServer (values) {
  const dbDate = dateLib.getDateNowForDatabase()

  return {
    name: values.name.trim(),
    description: _mapDescriptionToServer(values.description),
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
    openingTimes: _mapOpeningTimesToServer(values.openingTimes),
    additionalOpeningTimes: _mapAdditionalOpeningTimesToServer(
      values.additionalOpeningTimes
    ),
    openingTimesClosures: _mapOpeningTimesClosuresToServer(
      values.openingTimesClosures
    ),
    namedClosures: values.namedClosures
      ? values.namedClosures.split(',')
      : null,
    links: _mapLinksToServer(values.links),
    images: _mapImagesToServer(values.images),
    weSay: values.weSay.trim(),
    notes: values.notes.trim(),
    version: values.version + 1,
    createdDate: values.createdDate || dbDate,
    updatedDate: dbDate
  }
}

export function mapVenueFromServer (payload) {
  const result = {
    id: payload.id,
    name: payload.name,
    status: payload.status,
    validStatuses: entityLib.getValidStatuses(payload.status),
    venueType: payload.venueType,
    description: _mapDescriptionFromServer(payload.description),
    address: payload.address,
    pin: {
      lat: payload.latitude,
      lng: payload.longitude
    },
    defaultCenter: {
      lat: payload.latitude,
      lng: payload.longitude
    },
    postcode: payload.postcode,
    email: payload.email || '',
    telephone: payload.telephone || '',
    wheelchairAccessType: payload.wheelchairAccessType,
    disabledBathroomType: payload.disabledBathroomType,
    hearingFacilitiesType: payload.hearingFacilitiesType,
    hasPermanentCollection: payload.hasPermanentCollection,
    openingTimes: _mapOpeningTimesFromServer(payload.openingTimes),
    additionalOpeningTimes: _mapAdditionalOpeningTimesFromServer(
      payload.additionalOpeningTimes
    ),
    openingTimesClosures: _mapOpeningTimesClosuresFromServer(
      payload.openingTimesClosures
    ),
    namedClosures: _mapNamedClosuresFromServer(payload.namedClosures),
    links: _mapLinksFromServer(payload.links),
    images: _mapImagesFromServer(payload.images),
    weSay: payload.weSay || '',
    notes: payload.notes || '',
    version: payload.version,
    createdDate: payload.createdDate
  }

  return result
}

export function mapEventToServer (values) {
  const dbDate = dateLib.getDateNowForDatabase()
  const isFree = !eventLib.eventIsPaid(values.costType)
  const costFrom = isFree ? null : parseFloat(values.costFrom)
  const costTo = isFree ? null : parseFloat(values.costTo)

  const bookingNotRequired = !eventLib.bookingRequired(values.bookingType)
  const bookingOpens = bookingNotRequired ? null : values.bookingOpens
  const hasOccurrenceRange = eventLib.occurrenceTypeHasDateRange(
    values.occurrenceType
  )

  const result = {
    name: values.name.trim(),
    status: values.status,
    eventType: values.eventType,
    occurrenceType: values.occurrenceType,
    dateFrom: hasOccurrenceRange ? values.dateFrom : null,
    dateTo: hasOccurrenceRange ? values.dateTo : null,
    summary: values.summary.trim(),
    description: _mapDescriptionToServer(values.description),
    descriptionCredit: values.descriptionCredit.trim(),
    links: _mapLinksToServer(values.links),
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
    timesRanges: _mapTimesRangesToServer(values.timesRanges),
    openingTimes: _mapOpeningTimesToServer(values.openingTimes),
    additionalOpeningTimes: _mapAdditionalOpeningTimesToServer(
      values.additionalOpeningTimes
    ),
    specialOpeningTimes: _mapSpecialOpeningTimesToServer(
      values.specialOpeningTimes
    ),
    openingTimesClosures: _mapOpeningTimesClosuresToServer(
      values.openingTimesClosures
    ),
    performances: _mapPerformancesToServer(values.performances),
    additionalPerformances: _mapAdditionalPerformancesToServer(
      values.additionalPerformances
    ),
    specialPerformances: _mapSpecialPerformancesToServer(
      values.specialPerformances
    ),
    performancesClosures: _mapPerformancesClosuresToServer(
      values.performancesClosures
    ),
    talents: _mapTalentsToServer(values.talents),
    mediumTags: values.mediumTags,
    styleTags: values.styleTags,
    audienceTags: values.audienceTags,
    geoTags: values.geoTags,
    weSay: values.weSay.trim(),
    rating: parseInt(values.rating),
    minAge: values.minAge ? parseInt(values.minAge) : null,
    images: _mapImagesToServer(values.images),
    version: values.version + 1,
    createdDate: values.createdDate || dbDate,
    updatedDate: dbDate
  }

  return result
}

export function mapEventFromServer (payload) {
  const isPaid = eventLib.eventIsPaid(payload.costType)
  const bookingIsRequired = eventLib.bookingRequired(payload.bookingType)
  const hasOccurrenceRange = eventLib.occurrenceTypeHasDateRange(
    payload.occurrenceType
  )

  const result = {
    id: payload.id,
    name: payload.name,
    status: payload.status,
    validStatuses: entityLib.getValidStatuses(payload.status),
    eventType: payload.eventType,
    costType: payload.costType,
    costFrom: isPaid ? payload.costFrom.toFixed(2) : '',
    costTo: isPaid ? payload.costTo.toFixed(2) : '',
    occurrenceType: payload.occurrenceType,
    dateFrom: hasOccurrenceRange ? payload.dateFrom : null,
    dateTo: hasOccurrenceRange ? payload.dateTo : null,
    summary: payload.summary,
    description: _mapDescriptionFromServer(payload.description),
    descriptionCredit: payload.descriptionCredit || '',
    bookingType: payload.bookingType,
    bookingOpens: bookingIsRequired ? payload.bookingOpens : null,
    venue: mapVenueFromServer(payload.venue),
    venueGuidance: payload.venueGuidance || '',
    eventSeries: mapEventSeriesFromServerForEvent(payload.eventSeries),
    duration: payload.duration || '',
    weSay: payload.weSay || '',
    rating: payload.rating.toString(),
    minAge: payload.minAge ? payload.minAge.toString() : '',
    useVenueOpeningTimes: payload.useVenueOpeningTimes,
    timesRanges: _mapTimesRangesFromServer(payload.timesRanges),
    openingTimes: _mapOpeningTimesFromServer(payload.openingTimes),
    additionalOpeningTimes: _mapAdditionalOpeningTimesFromServer(
      payload.additionalOpeningTimes
    ),
    specialOpeningTimes: _mapSpecialOpeningTimesFromServer(
      payload.specialOpeningTimes
    ),
    openingTimesClosures: _mapOpeningTimesClosuresFromServer(
      payload.openingTimesClosures
    ),
    performances: _mapPerformancesFromServer(payload.performances),
    additionalPerformances: _mapAdditionalPerformancesFromServer(
      payload.additionalPerformances
    ),
    specialPerformances: _mapSpecialPerformancesFromServer(
      payload.specialPerformances
    ),
    performancesClosures: _mapPerformancesClosuresFromServer(
      payload.performancesClosures
    ),
    closures: _mapClosuresFromServer(payload.closures),
    talents: _mapTalentsFromServer(payload.talents),
    mediumTags: payload.mediumTags || [],
    styleTags: payload.styleTags || [],
    audienceTags: payload.audienceTags || [],
    geoTags: payload.geoTags || [],
    links: _mapLinksFromServer(payload.links),
    images: _mapImagesFromServer(payload.images),
    version: payload.version,
    createdDate: payload.createdDate
  }

  normaliseEventValues(result)
  return result
}

export function mapEventSeriesFromServerForEvent (payload) {
  if (!payload) {
    return {}
  }

  const result = {
    id: payload.id,
    name: payload.name,
    eventSeriesType: payload.eventSeriesType
  }

  return result
}

export function mapEventSeriesToServer (values) {
  const dbDate = dateLib.getDateNowForDatabase()

  const result = {
    name: values.name.trim(),
    status: values.status,
    eventSeriesType: values.eventSeriesType,
    occurrence: values.occurrence.trim(),
    summary: values.summary.trim(),
    description: _mapDescriptionToServer(values.description),
    descriptionCredit: values.descriptionCredit.trim(),
    links: _mapLinksToServer(values.links),
    images: _mapImagesToServer(values.images),
    weSay: values.weSay.trim(),
    version: values.version + 1,
    createdDate: values.createdDate || dbDate,
    updatedDate: dbDate
  }

  return result
}

export function mapEventSeriesFromServer (payload) {
  const result = {
    id: payload.id,
    name: payload.name,
    status: payload.status,
    validStatuses: entityLib.getValidStatuses(payload.status),
    eventSeriesType: payload.eventSeriesType,
    occurrence: payload.occurrence,
    summary: payload.summary,
    description: _mapDescriptionFromServer(payload.description),
    descriptionCredit: payload.descriptionCredit || '',
    links: _mapLinksFromServer(payload.links),
    images: _mapImagesFromServer(payload.images),
    weSay: payload.weSay || '',
    version: payload.version,
    createdDate: payload.createdDate
  }

  return result
}

function _filterTimeEntries (entry, dateFrom, dateTo) {
  return entry.date >= dateFrom && entry.date <= dateTo
}

function _mapCSVStringToServer (str) {
  return (str || '')
    .split(',')
    .map(role => role.trim())
    .filter(role => role !== '')
}

function _mapAudienceTagsFromServer (audienceTags) {
  return (audienceTags || []).map(tag => ({ id: tag.id, label: tag.label }))
}

function _mapAudienceTagsToServer (audienceTags) {
  return (audienceTags || []).map(tag => ({ id: tag.id, label: tag.label }))
}

function _mapLinksToServer (links) {
  return (links || []).map(link => ({
    type: link.type,
    url: link.url
  }))
}

function _mapLinksFromServer (links) {
  return (links || []).map(link => ({
    key: link.type,
    type: link.type,
    url: link.url
  }))
}

function _mapImagesToServer (images) {
  images = images || []

  images = images
    .filter(image => image.isMain)
    .filter(image => image.status !== IMAGE_STATUS_PROCESSING)
    .concat(images.filter(image => !image.isMain))

  return images.map(image => ({
    id: image.id,
    copyright: image.copyright,
    ratio: image.ratio
  }))
}

function _mapImagesFromServer (images) {
  return (images || []).map((image, i) => ({
    key: image.id,
    id: image.id,
    copyright: image.copyright,
    isMain: i === 0,
    previewUrl: imageLib.createEntityEditPreviewImageUrl(image.id),
    ratio: image.ratio
  }))
}

function _mapDescriptionToServer (description) {
  if (!description) {
    return null
  }

  const result = description.toString('html')
  return entityLib.descriptionStringIsEmpty(result) ? null : result
}

function _mapDescriptionFromServer (description) {
  return RichTextEditor.createValueFromString(description || '', 'html')
}

function _mapTimesRangesFromServer (timesRanges) {
  return (timesRanges || []).map(timesRange => ({
    key: timesRange.id,
    id: timesRange.id,
    label: timesRange.label || '',
    dateFrom: timesRange.dateFrom,
    dateTo: timesRange.dateTo
  }))
}

function _mapOpeningTimesFromServer (openingTimes) {
  return (openingTimes || []).map(openingTime => ({
    key: dateLib.createTimeKey(openingTime),
    day: openingTime.day.toString(),
    from: openingTime.from,
    to: openingTime.to,
    timesRangeId: openingTime.timesRangeId
  }))
}

function _mapAdditionalOpeningTimesFromServer (additionalOpeningTimes) {
  return (additionalOpeningTimes || []).map(addition => ({
    key: dateLib.createTimeKey(addition),
    date: addition.date,
    from: addition.from,
    to: addition.to
  }))
}

function _mapAdditionalPerformancesFromServer (additionalPerformances) {
  return (additionalPerformances || []).map(addition => ({
    key: dateLib.createTimeKey(addition),
    date: addition.date,
    at: addition.at
  }))
}

function _mapSpecialOpeningTimesFromServer (specialOpeningTimes) {
  return (specialOpeningTimes || []).map(special => ({
    key: dateLib.createTimeKey(special),
    date: special.date,
    from: special.from,
    to: special.to,
    audienceTags: _mapAudienceTagsFromServer(special.audienceTags)
  }))
}

function _mapSpecialPerformancesFromServer (specialPerformances) {
  return (specialPerformances || []).map(special => ({
    key: dateLib.createTimeKey(special),
    date: special.date,
    at: special.at,
    audienceTags: _mapAudienceTagsFromServer(special.audienceTags)
  }))
}

function _mapClosuresFromServer (closures) {
  return (closures || []).map(closure => ({
    key: closure,
    date: closure
  }))
}

function _mapOpeningTimesClosuresFromServer (openingTimesClosures) {
  return (openingTimesClosures || []).map(closure => {
    const result = {
      key: dateLib.createTimeKey(closure),
      date: closure.date
    }

    if (closure.from) {
      result.from = closure.from
      result.to = closure.to
    }

    return result
  })
}

function _mapPerformancesClosuresFromServer (peformancesClosures) {
  return (peformancesClosures || []).map(closure => {
    const result = {
      key: dateLib.createTimeKey(closure),
      date: closure.date
    }

    if (closure.at) {
      result.at = closure.at
    }

    return result
  })
}

function _mapNamedClosuresFromServer (namedClosures) {
  return (namedClosures || []).join(',')
}

function _mapPerformancesFromServer (performances) {
  return (performances || []).map(performance => ({
    key: dateLib.createTimeKey(performance),
    day: performance.day.toString(),
    at: performance.at,
    timesRangeId: performance.timesRangeId
  }))
}

function _mapTalentsFromServer (talents) {
  return (talents || []).map(talent => {
    talent.key = talent.id
    talent.roles = talent.roles.join(', ')
    talent.characters = (talent.characters || []).join(', ')
    return talent
  })
}

function _mapTimesRangesToServer (timesRanges) {
  return (timesRanges || []).map(timesRange => ({
    id: timesRange.id,
    label: timesRange.label,
    dateFrom: timesRange.dateFrom,
    dateTo: timesRange.dateTo
  }))
}

function _mapOpeningTimesToServer (openingTimes) {
  return (openingTimes || []).map(openingTime => ({
    day: parseInt(openingTime.day),
    from: openingTime.from,
    to: openingTime.to,
    timesRangeId: openingTime.timesRangeId
  }))
}

function _mapPerformancesToServer (performances) {
  return (performances || []).map(performance => ({
    day: parseInt(performance.day),
    at: performance.at,
    timesRangeId: performance.timesRangeId
  }))
}

function _mapAdditionalOpeningTimesToServer (additionalOpeningTimes) {
  return (additionalOpeningTimes || []).map(addition => ({
    date: addition.date,
    from: addition.from,
    to: addition.to
  }))
}

function _mapAdditionalPerformancesToServer (additionalPerformances) {
  return (additionalPerformances || []).map(addition => ({
    date: addition.date,
    at: addition.at
  }))
}

function _mapSpecialOpeningTimesToServer (specialOpeningTimes) {
  return (specialOpeningTimes || []).map(special => ({
    date: special.date,
    from: special.from,
    to: special.to,
    audienceTags: _mapAudienceTagsToServer(special.audienceTags)
  }))
}

function _mapSpecialPerformancesToServer (specialPerformances) {
  return (specialPerformances || []).map(special => ({
    date: special.date,
    at: special.at,
    audienceTags: _mapAudienceTagsToServer(special.audienceTags)
  }))
}

function _mapOpeningTimesClosuresToServer (openingTimesClosures) {
  return (openingTimesClosures || []).map(closure => {
    const result = { date: closure.date }

    if (closure.from) {
      result.from = closure.from
      result.to = closure.to
    }

    return result
  })
}

function _mapPerformancesClosuresToServer (performancesClosures) {
  return (performancesClosures || []).map(closure => {
    const result = { date: closure.date }

    if (closure.at) {
      result.at = closure.at
    }

    return result
  })
}

function _mapTalentsToServer (talents) {
  return (talents || []).map(talent => ({
    id: talent.id,
    roles: _mapCSVStringToServer(talent.roles),
    characters: _mapCSVStringToServer(talent.characters)
  }))
}
