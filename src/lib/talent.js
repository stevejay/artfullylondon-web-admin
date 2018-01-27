import { TALENT_TYPE_INDIVIDUAL } from '_src/constants/talent'

export function isIndividualTalent (talentType) {
  return talentType === TALENT_TYPE_INDIVIDUAL
}

export function formatTalentName (talent) {
  return `${talent.firstNames} ${talent.lastName}`.trim()
}
