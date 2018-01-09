import _ from 'lodash'

import * as entityConstants from '_src/constants/entity'
import { createEntityCardImageUrl } from '_src/lib/image'

export function createEntityUrl (entityType, id) {
  return `/${entityType}/${id}`
}

export function createEntityEditUrl (entityType, id) {
  return `/${entityType}/edit/${id}`
}

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
    default:
      throw new Error(`entityType is out of range: ${entityType}`)
  }
}

export function getColorForEntityType (data) {
  switch (data.entityType) {
    case entityConstants.ENTITY_TYPE_EVENT:
      return '#75CA18'
    case entityConstants.ENTITY_TYPE_EVENT_SERIES:
      return '#4990E2'
    case entityConstants.ENTITY_TYPE_TALENT:
      return '#FF632A'
    case entityConstants.ENTITY_TYPE_VENUE:
      return '#DB3b9C'
    default:
      throw new Error(`entityType is out of range: ${data.entityType}`)
  }
}

export function getEntityCardImageDataForEntityType (entityType, image) {
  switch (entityType) {
    case entityConstants.ENTITY_TYPE_EVENT:
    case entityConstants.ENTITY_TYPE_EVENT_SERIES:
    case entityConstants.ENTITY_TYPE_TALENT:
    case entityConstants.ENTITY_TYPE_VENUE:
      return {
        height: entityConstants.DEFAULT_ENTITY_CARD_HEIGHT,
        url: createEntityCardImageUrl(image)
      }
    default:
      throw new Error(`entityType is out of range: ${entityType}`)
  }
}

export function processDescription (description, credit) {
  if (!description) {
    return '<p>We do not have a description.</p>'
  }

  let result = description

  if (credit) {
    result =
      result + '<p><em>(Description by ' + _.escape(credit) + '.)</em></p>'
  }

  return result
}

export const getValidStatuses = function (currentState) {
  switch (currentState) {
    case entityConstants.PENDING_STATUS:
      return [
        {
          value: entityConstants.PENDING_STATUS,
          label: entityConstants.PENDING_STATUS
        },
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
        },
        {
          value: entityConstants.DELETED_STATUS,
          label: entityConstants.DELETED_STATUS
        }
      ]
    case entityConstants.ACTIVE_STATUS:
      return [
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
        },
        {
          value: entityConstants.DELETED_STATUS,
          label: entityConstants.DELETED_STATUS
        }
      ]
    case entityConstants.DELETED_STATUS:
      return [
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
        },
        {
          value: entityConstants.DELETED_STATUS,
          label: entityConstants.DELETED_STATUS
        }
      ]
    case entityConstants.MERGED_STATUS:
      return [
        {
          value: entityConstants.MERGED_STATUS,
          label: entityConstants.MERGED_STATUS
        }
      ]
  }
}

const emptyDescriptionStringRegex = /^<p>\s*(?:<br>|<br\/>|<br \/>)?\s*<\/p>$/

export function descriptionStringIsEmpty (descriptionStr) {
  return emptyDescriptionStringRegex.test(descriptionStr)
}
