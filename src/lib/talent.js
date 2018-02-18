export function formatTalentName (talent) {
  return `${talent.firstNames || ''} ${talent.lastName || ''}`.trim()
}
