import _ from 'lodash'

import * as entityConstants from '_src/constants/entity'
import * as imageLib from '_src/lib/image'

export function getEntityTypeUrlParameter (match) {
  return match.params.entityType.toLowerCase()
}

export function createEntityUrl (entityType, id) {
  return `/${entityType}/${id}`
}

export function createEntityEditUrl (entityType, id) {
  return `/${entityType}/edit/${id}`
}

export function getEntityCardImageDataForEntityType (entityType, image) {
  switch (entityType) {
    case entityConstants.ENTITY_TYPE_EVENT:
    case entityConstants.ENTITY_TYPE_EVENT_SERIES:
    case entityConstants.ENTITY_TYPE_TALENT:
    case entityConstants.ENTITY_TYPE_VENUE:
      return {
        height: entityConstants.DEFAULT_ENTITY_CARD_HEIGHT,
        url: imageLib.createEntityCardImageUrl(image)
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

const emptyDescriptionStringRegex = /^<p>\s*(?:<br>|<br\/>|<br \/>)?\s*<\/p>$/

export function descriptionStringIsEmpty (descriptionStr) {
  return emptyDescriptionStringRegex.test(descriptionStr)
}
