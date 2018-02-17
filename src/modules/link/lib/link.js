import _ from 'lodash'

import linkType from '_src/entities/link-type'
import { LINK_TYPE_DROPDOWN_OPTIONS } from '../constants'

export function getAvailableLinkTypeDropdownOptions (value) {
  return LINK_TYPE_DROPDOWN_OPTIONS.filter(
    x => _.findIndex(value, y => x.value === y.type) === -1
  )
}

export function validateLink (values, errors) {
  if (!isValidUrlForLinkType(values.linkUrl, values.linkType)) {
    errors.linkUrl = 'Link Url is in wrong format for the link type'
  }
}

function isValidUrlForLinkType (url, type) {
  switch (type) {
    case linkType.TWITTER:
      return /https:\/\/twitter\.com\//.test(url)
    case linkType.WIKIPEDIA:
      return /https:\/\/en\.wikipedia\.org\//.test(url)
    case linkType.FACEBOOK:
      return /https:\/\/www\.facebook\.com\//.test(url)
    case linkType.INSTAGRAM:
      return /https:\/\/www\.instagram\.com\//.test(url)
  }

  // all other link types have no validation:
  return true
}
