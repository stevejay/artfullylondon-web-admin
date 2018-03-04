import { entityMapper } from '_src/modules/entity'
import statusType from '_src/domain/types/status-type'

export function getInitialValues (eventSeries) {
  return {
    id: eventSeries.id || null,
    status: eventSeries.status || statusType.ACTIVE,
    validStatuses: entityMapper.getValidStatusesInitialValue(
      eventSeries.status
    ),
    name: eventSeries.name || '',
    eventSeriesType: eventSeries.eventSeriesType || '',
    occurrence: eventSeries.occurrence || '',
    summary: eventSeries.summary || '',
    description: entityMapper.getRichTextInitialValue(eventSeries.description),
    descriptionCredit: eventSeries.descriptionCredit || '',
    links: entityMapper.getLinksInitialValue(eventSeries.links),
    images: entityMapper.getImagesInitialValue(eventSeries.images),
    weSay: eventSeries.weSay || '',
    version: eventSeries.version || 0
  }
}

export function mapSubmittedValues (values) {
  return {
    name: values.name.trim(),
    status: values.status,
    eventSeriesType: values.eventSeriesType,
    occurrence: values.occurrence.trim(),
    summary: values.summary.trim(),
    description: entityMapper.mapSubmittedDescription(values.description),
    descriptionCredit: values.descriptionCredit.trim(),
    links: entityMapper.mapSubmittedLinks(values.links),
    images: entityMapper.mapSubmittedImages(values.images),
    weSay: (values.weSay || '').trim(),
    version: values.version + 1
  }
}
