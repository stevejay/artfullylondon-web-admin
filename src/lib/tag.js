import _ from 'lodash'
import * as tagConstants from '_src/constants/tag'

export function getTagTypeFromTagId (id) {
  if (_.startsWith(id, 'geo/')) {
    return tagConstants.TAG_TYPE_GEO
  }

  if (_.startsWith(id, 'medium/')) {
    return tagConstants.TAG_TYPE_MEDIUM
  }

  if (_.startsWith(id, 'style/')) {
    return tagConstants.TAG_TYPE_STYLE
  }

  if (_.startsWith(id, 'audience/')) {
    return tagConstants.TAG_TYPE_AUDIENCE
  }

  throw new Error(`id '${id}' does not have a recognized tag type`)
}

export function getTagTypeFromLocation (location) {
  const parts = location.pathname.split('/')

  if (parts.length > 1) {
    return parts[parts.length - 1].toLowerCase()
  }

  throw new Error('Could not determine tag type')
}
