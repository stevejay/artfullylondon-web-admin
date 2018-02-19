import * as dateLib from '_src/lib/date'
import { entityMapper } from '_src/modules/entity'
import statusType from '_src/domain/types/status-type'

export function getInitialValues (eventSeries) {
  if (eventSeries.isNew()) {
    return {
      id: null,
      status: statusType.ACTIVE,
      validStatuses: entityMapper.getValidStatusesInitialValue(),
      name: '',
      eventSeriesType: '',
      occurrence: '',
      summary: '',
      description: entityMapper.getRichTextInitialValue(),
      descriptionCredit: '',
      links: [],
      images: [],
      weSay: '',
      version: 0,
      createdDate: null
    }
  }

  return {
    id: eventSeries.id,
    status: eventSeries.status,
    validStatuses: entityMapper.getValidStatusesInitialValue(
      eventSeries.status
    ),
    name: eventSeries.name,
    eventSeriesType: eventSeries.eventSeriesType,
    occurrence: eventSeries.occurrence,
    summary: eventSeries.summary,
    description: entityMapper.getRichTextInitialValue(eventSeries.description),
    descriptionCredit: eventSeries.descriptionCredit || '',
    links: entityMapper.getLinksInitialValue(eventSeries.links.links),
    images: entityMapper.getImagesInitialValue(eventSeries.images),
    weSay: eventSeries.weSay || '',
    version: eventSeries.version,
    createdDate: eventSeries.createdDate
  }
}

export function mapSubmittedValues (values) {
  // TODO this should be driven by the db:
  const dbDate = dateLib.getDateNowForDatabase()

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
    version: values.version + 1,
    createdDate: values.createdDate || dbDate,
    updatedDate: dbDate
  }
}
