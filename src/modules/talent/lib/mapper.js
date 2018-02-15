import * as entityConstants from '_src/constants/entity'
import * as talentConstants from '_src/constants/talent'
import * as dateLib from '_src/lib/date'
import * as talentLib from '_src/lib/talent'
import { entityMapper } from '_src/modules/entity'

export function getInitialValues (talent) {
  if (talent.isNew) {
    return {
      id: null,
      status: entityConstants.ACTIVE_STATUS,
      validStatuses: entityMapper.getValidStatusesInitialValue(),
      firstNames: '',
      lastName: '',
      talentType: talentConstants.TALENT_TYPE_INDIVIDUAL,
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
    links: entityMapper.getLinksInitialValue(talent.links.links),
    images: entityMapper.getImagesInitialValue(talent.images),
    weSay: talent.weSay || '',
    version: talent.version,
    createdDate: talent.createdDate
  }
}

export function mapSubmittedValues (values) {
  const isIndividual = talentLib.isIndividualTalent(values.talentType)
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
