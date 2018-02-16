import * as entityConstants from '_src/constants/entity'

export function getLabelForEntityType (entityType) {
  switch (entityType) {
    case entityConstants.ENTITY_TYPE_EVENT:
      return 'Event'
    case entityConstants.ENTITY_TYPE_EVENT_SERIES:
      return 'Event Series'
    case entityConstants.ENTITY_TYPE_TALENT:
      return 'Talent'
    case entityConstants.ENTITY_TYPE_VENUE:
      return 'Venue'
    /* istanbul ignore next */
    default:
      throw new Error(`entityType is out of range: ${entityType}`)
  }
}
