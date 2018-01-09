import { TALENT_TYPE_INDIVIDUAL } from '_src/constants/talent'

export function isIndividualTalent (talentType) {
  return talentType === TALENT_TYPE_INDIVIDUAL
}

export function formatTalentName (talent) {
  const { firstNames, lastName } = talent
  return firstNames ? firstNames + ' ' + lastName : lastName || ''
}
