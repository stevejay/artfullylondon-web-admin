import entityType from '_src/domain/types/entity-type'

export function getLabelForEntityType (type) {
  switch (type) {
    case entityType.EVENT:
      return 'Event'
    case entityType.EVENT_SERIES:
      return 'Event Series'
    case entityType.TALENT:
      return 'Talent'
    case entityType.VENUE:
      return 'Venue'
    /* istanbul ignore next */
    default:
      throw new Error(`entityType is out of range: ${type}`)
  }
}
