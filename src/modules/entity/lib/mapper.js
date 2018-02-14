import RichTextEditor from 'react-rte'

import * as imageLib from '_src/lib/image'
import * as entityLib from '_src/lib/entity'
import * as dateLib from '_src/lib/date'
import * as entityConstants from '_src/constants/entity'

// TODO maybe make part of domain
const IMAGE_STATUS_PROCESSING = 'Processing'

export function getRichTextInitialValue (text) {
  return RichTextEditor.createValueFromString(text || '', 'html')
}

export function mapSubmittedDescription (description) {
  if (!description) {
    return null
  }

  const result = description.toString('html')
  return entityLib.descriptionStringIsEmpty(result) ? null : result
}

export function getLinksInitialValue (links) {
  return (links || []).map(link => ({
    key: link.type,
    type: link.type,
    url: link.url
  }))
}

export function mapSubmittedLinks (links) {
  return (links || []).map(link => ({
    type: link.type,
    url: link.url
  }))
}

export function getImagesInitialValue (images) {
  return (images || []).map((image, i) => ({
    key: image.id,
    id: image.id,
    copyright: image.copyright,
    isMain: i === 0,
    previewUrl: imageLib.createEntityEditPreviewImageUrl(image.id),
    ratio: image.ratio
  }))
}

export function mapSubmittedImages (images) {
  images = (images || [])
    .filter(image => image.status !== IMAGE_STATUS_PROCESSING)

  images = images
    .filter(image => image.isMain)
    .concat(images.filter(image => !image.isMain))

  return images.map(image => ({
    id: image.id,
    copyright: image.copyright,
    ratio: image.ratio
  }))
}

export function getValidStatusesInitialValue (status) {
  switch (status) {
    case entityConstants.PENDING_STATUS:
      return [
        {
          value: entityConstants.PENDING_STATUS,
          label: entityConstants.PENDING_STATUS
        },
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
        },
        {
          value: entityConstants.DELETED_STATUS,
          label: entityConstants.DELETED_STATUS
        }
      ]
    case entityConstants.ACTIVE_STATUS:
      return [
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
        },
        {
          value: entityConstants.DELETED_STATUS,
          label: entityConstants.DELETED_STATUS
        }
      ]
    case entityConstants.DELETED_STATUS:
      return [
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
        },
        {
          value: entityConstants.DELETED_STATUS,
          label: entityConstants.DELETED_STATUS
        }
      ]
    case entityConstants.MERGED_STATUS:
      return [
        {
          value: entityConstants.MERGED_STATUS,
          label: entityConstants.MERGED_STATUS
        }
      ]
    default:
      return [
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
        }
      ]
  }
}

export function getTimesRangesInitialValue (timesRanges) {
  return (timesRanges || []).map(timesRange => ({
    key: timesRange.id,
    id: timesRange.id,
    label: timesRange.label || '',
    dateFrom: timesRange.dateFrom,
    dateTo: timesRange.dateTo
  }))
}

export function getOpeningTimesInitialValue (openingTimes) {
  return (openingTimes || []).map(openingTime => ({
    key: dateLib.createTimeKey(openingTime),
    day: openingTime.day.toString(),
    from: openingTime.from,
    to: openingTime.to,
    timesRangeId: openingTime.timesRangeId
  }))
}

export function getAdditionalOpeningTimesInitialValue (additionalOpeningTimes) {
  return (additionalOpeningTimes || []).map(addition => ({
    key: dateLib.createTimeKey(addition),
    date: addition.date,
    from: addition.from,
    to: addition.to
  }))
}

export function getAdditionalPerformancesInitialValue (additionalPerformances) {
  return (additionalPerformances || []).map(addition => ({
    key: dateLib.createTimeKey(addition),
    date: addition.date,
    at: addition.at
  }))
}

export function getSpecialOpeningTimesInitialValue (specialOpeningTimes) {
  return (specialOpeningTimes || []).map(special => ({
    key: dateLib.createTimeKey(special),
    date: special.date,
    from: special.from,
    to: special.to,
    audienceTags: getAudienceTagsInitialValue(special.audienceTags)
  }))
}

export function getSpecialPerformancesInitialValue (specialPerformances) {
  return (specialPerformances || []).map(special => ({
    key: dateLib.createTimeKey(special),
    date: special.date,
    at: special.at,
    audienceTags: getAudienceTagsInitialValue(special.audienceTags)
  }))
}

export function getClosuresInitialValue (closures) {
  return (closures || []).map(closure => ({
    key: closure,
    date: closure
  }))
}

export function getOpeningTimesClosuresInitialValue (openingTimesClosures) {
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

export function getPerformancesClosuresInitialValue (peformancesClosures) {
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

export function getNamedClosuresInitialValue (namedClosures) {
  return (namedClosures || []).join(',')
}

export function getPerformancesInitialValue (performances) {
  return (performances || []).map(performance => ({
    key: dateLib.createTimeKey(performance),
    day: performance.day.toString(),
    at: performance.at,
    timesRangeId: performance.timesRangeId
  }))
}

function getAudienceTagsInitialValue (audienceTags) {
  return (audienceTags || []).map(tag => ({ id: tag.id, label: tag.label }))
}

export function mapSubmittedTimesRanges (timesRanges) {
  return (timesRanges || []).map(timesRange => ({
    id: timesRange.id,
    label: timesRange.label,
    dateFrom: timesRange.dateFrom,
    dateTo: timesRange.dateTo
  }))
}

export function mapSubmittedOpeningTimes (openingTimes) {
  return (openingTimes || []).map(openingTime => ({
    day: parseInt(openingTime.day),
    from: openingTime.from,
    to: openingTime.to,
    timesRangeId: openingTime.timesRangeId
  }))
}

export function mapSubmittedPerformances (performances) {
  return (performances || []).map(performance => ({
    day: parseInt(performance.day),
    at: performance.at,
    timesRangeId: performance.timesRangeId
  }))
}

export function mapSubmittedAdditionalOpeningTimes (additionalOpeningTimes) {
  return (additionalOpeningTimes || []).map(addition => ({
    date: addition.date,
    from: addition.from,
    to: addition.to
  }))
}

export function mapSubmittedAdditionalPerformances (additionalPerformances) {
  return (additionalPerformances || []).map(addition => ({
    date: addition.date,
    at: addition.at
  }))
}

export function mapSubmittedSpecialOpeningTimes (specialOpeningTimes) {
  return (specialOpeningTimes || []).map(special => ({
    date: special.date,
    from: special.from,
    to: special.to,
    audienceTags: mapSubmittedAudienceTags(special.audienceTags)
  }))
}

export function mapSubmittedSpecialPerformances (specialPerformances) {
  return (specialPerformances || []).map(special => ({
    date: special.date,
    at: special.at,
    audienceTags: mapSubmittedAudienceTags(special.audienceTags)
  }))
}

export function mapSubmittedOpeningTimesClosures (openingTimesClosures) {
  return (openingTimesClosures || []).map(closure => {
    const result = { date: closure.date }

    if (closure.from) {
      result.from = closure.from
      result.to = closure.to
    }

    return result
  })
}

export function mapSubmittedPerformancesClosures (performancesClosures) {
  return (performancesClosures || []).map(closure => {
    const result = { date: closure.date }

    if (closure.at) {
      result.at = closure.at
    }

    return result
  })
}

function mapSubmittedAudienceTags (audienceTags) {
  return (audienceTags || []).map(tag => ({ id: tag.id, label: tag.label }))
}