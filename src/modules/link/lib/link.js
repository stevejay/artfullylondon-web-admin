import _ from 'lodash'

import * as linkConstants from '_src/constants/link'
import { LINK_TYPE_DROPDOWN_OPTIONS } from '_src/modules/link/constants'

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
    case linkConstants.LINK_TYPE_TWITTER:
      return /https:\/\/twitter\.com\//.test(url)
    case linkConstants.LINK_TYPE_WIKIPEDIA:
      return /https:\/\/en\.wikipedia\.org\//.test(url)
    case linkConstants.LINK_TYPE_FACEBOOK:
      return /https:\/\/www\.facebook\.com\//.test(url)
    case linkConstants.LINK_TYPE_INSTAGRAM:
      return /https:\/\/www\.instagram\.com\//.test(url)
  }

  // all other link types have no validation:
  return true
}
