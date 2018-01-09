import React from 'react'
import _ from 'lodash'
import Bank from 'react-icons/lib/fa/bank'
import User from 'react-icons/lib/fa/user'
import Star from 'react-icons/lib/fa/star-o'
import Tags from 'react-icons/lib/fa/tags'
import Cogs from 'react-icons/lib/fa/cogs'

import * as constants from '_src/constants/entity'
import { createEntityCardImageUrl } from '_src/lib/image'
import {
  PENDING_STATUS,
  ACTIVE_STATUS,
  DELETED_STATUS,
  MERGED_STATUS
} from '_src/constants/entity'

export function createEntityUrl (entityType, id) {
  return `/${entityType}/${id}`
}

export function createEntityEditUrl (entityType, id) {
  return `/${entityType}/edit/${id}`
}

export function getLabelForEntityType (entityType) {
  switch (entityType) {
    case constants.ENTITY_TYPE_EVENT:
      return 'Event'
    case constants.ENTITY_TYPE_EVENT_SERIES:
      return 'Event Series'
    case constants.ENTITY_TYPE_TALENT:
      return 'Talent'
    case constants.ENTITY_TYPE_VENUE:
      return 'Venue'
    default:
      throw new Error(`entityType is out of range: ${entityType}`)
  }
}

export function getColorForEntityType (data) {
  switch (data.entityType) {
    case constants.ENTITY_TYPE_EVENT:
      return '#75CA18'
    case constants.ENTITY_TYPE_EVENT_SERIES:
      return '#4990E2'
    case constants.ENTITY_TYPE_TALENT:
      return '#FF632A'
    case constants.ENTITY_TYPE_VENUE:
      return '#DB3b9C'
    default:
      throw new Error(`entityType is out of range: ${data.entityType}`)
  }
}

export function getEntityCardImageDataForEntityType (entityType, image) {
  switch (entityType) {
    case constants.ENTITY_TYPE_EVENT:
    case constants.ENTITY_TYPE_EVENT_SERIES:
    case constants.ENTITY_TYPE_TALENT:
    case constants.ENTITY_TYPE_VENUE:
      return {
        height: constants.DEFAULT_ENTITY_CARD_HEIGHT,
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
    case PENDING_STATUS:
      return [
        { value: PENDING_STATUS, label: PENDING_STATUS },
        { value: ACTIVE_STATUS, label: ACTIVE_STATUS },
        { value: DELETED_STATUS, label: DELETED_STATUS }
      ]
    case ACTIVE_STATUS:
      return [
        { value: ACTIVE_STATUS, label: ACTIVE_STATUS },
        { value: DELETED_STATUS, label: DELETED_STATUS }
      ]
    case DELETED_STATUS:
      return [
        { value: ACTIVE_STATUS, label: ACTIVE_STATUS },
        { value: DELETED_STATUS, label: DELETED_STATUS }
      ]
    case MERGED_STATUS:
      return [{ value: MERGED_STATUS, label: MERGED_STATUS }]
  }
}

const emptyDescriptionStringRegex = /^<p>\s*(?:<br>|<br\/>|<br \/>)?\s*<\/p>$/

export function descriptionStringIsEmpty (descriptionStr) {
  return emptyDescriptionStringRegex.test(descriptionStr)
}
