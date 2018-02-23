import RichTextEditor from 'react-rte'

import * as imageLib from '_src/shared/lib/image'
import * as entityLib from '_src/shared/lib/entity'
import * as dateLib from '_src/shared/lib/date'
import statusType from '_src/domain/types/status-type'
import imageStatusType from '_src/domain/types/image-status-type'

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
    .filter(image => image.status !== imageStatusType.PROCESSING)

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
    case statusType.PENDING:
      return [
        {
          value: statusType.PENDING,
          label: statusType.PENDING
        },
        {
          value: statusType.ACTIVE,
          label: statusType.ACTIVE
        },
        {
          value: statusType.DELETED,
          label: statusType.DELETED
        }
      ]
    case statusType.ACTIVE:
      return [
        {
          value: statusType.ACTIVE,
          label: statusType.ACTIVE
        },
        {
          value: statusType.DELETED,
          label: statusType.DELETED
        }
      ]
    case statusType.DELETED:
      return [
        {
          value: statusType.ACTIVE,
          label: statusType.ACTIVE
        },
        {
          value: statusType.DELETED,
          label: statusType.DELETED
        }
      ]
    case statusType.MERGED:
      return [
        {
          value: statusType.MERGED,
          label: statusType.MERGED
        }
      ]
    default:
      return [
        {
          value: statusType.ACTIVE,
          label: statusType.ACTIVE
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

export function getSoldOutPerformancesInitialValue (soldOutPerformances) {
  return (soldOutPerformances || []).map(performance => ({
    key: dateLib.createTimeKey(performance),
    date: performance.date.toString(),
    at: performance.at
  }))
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

export function mapSubmittedNamedClosures (namedClosures) {
  return namedClosures ? namedClosures.split(',') : null
}
