import talentType from '_src/domain/types/talent-type'
import statusType from '_src/domain/types/status-type'
import * as dateLib from '_src/shared/lib/date'
import { entityMapper } from '_src/modules/entity'

export function getBasicTalentInitialValues () {
  return {
    status: statusType.ACTIVE,
    firstNames: '',
    lastName: '',
    talentType: talentType.INDIVIDUAL,
    commonRole: '',
    links: [],
    images: [],
    weSay: '',
    version: 0
  }
}

export function getInitialValues (talent) {
  if (talent.isNew()) {
    return {
      id: null,
      status: statusType.ACTIVE,
      validStatuses: entityMapper.getValidStatusesInitialValue(),
      firstNames: '',
      lastName: '',
      talentType: talentType.INDIVIDUAL,
      commonRole: '',
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
    id: talent.id,
    status: talent.status,
    validStatuses: entityMapper.getValidStatusesInitialValue(talent.status),
    firstNames: talent.firstNames || '',
    lastName: talent.lastName,
    talentType: talent.talentType,
    commonRole: talent.commonRole,
    description: entityMapper.getRichTextInitialValue(talent.description),
    descriptionCredit: talent.descriptionCredit || '',
    links: entityMapper.getLinksInitialValue(talent.links),
    images: entityMapper.getImagesInitialValue(talent.images),
    weSay: talent.weSay || '',
    version: talent.version,
    createdDate: talent.createdDate
  }
}

export function mapSubmittedValues (values) {
  const isIndividual = values.talentType === talentType.INDIVIDUAL
  const firstNames = isIndividual ? (values.firstNames || '').trim() : ''
  // TODO this should be driven by the db:
  const dbDate = dateLib.getDateNowForDatabase()

  return {
    firstNames: firstNames,
    lastName: (values.lastName || '').trim(),
    description: entityMapper.mapSubmittedDescription(values.description),
    descriptionCredit: values.descriptionCredit.trim(),
    talentType: values.talentType,
    commonRole: values.commonRole,
    status: values.status,
    links: entityMapper.mapSubmittedLinks(values.links),
    images: entityMapper.mapSubmittedImages(values.images),
    weSay: (values.weSay || '').trim(),
    version: values.version + 1,
    createdDate: values.createdDate || dbDate,
    updatedDate: dbDate
  }
}
