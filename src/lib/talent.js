import talentType from '_src/entities/talent-type'

export function isIndividualTalent (type) {
  return type === talentType.INDIVIDUAL
}

export function formatTalentName (talent) {
  return `${talent.firstNames || ''} ${talent.lastName || ''}`.trim()
}
