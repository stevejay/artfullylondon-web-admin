import _ from 'lodash'

import linkType from '_src/entities/types/link-type'

export const LINK_TYPE_DROPDOWN_OPTIONS = [
  {
    value: linkType.HOMEPAGE,
    label: linkType.HOMEPAGE
  },
  {
    value: linkType.FACEBOOK,
    label: linkType.FACEBOOK
  },
  {
    value: linkType.TWITTER,
    label: linkType.TWITTER
  },
  {
    value: linkType.INSTAGRAM,
    label: linkType.INSTAGRAM
  },
  {
    value: linkType.WIKIPEDIA,
    label: linkType.WIKIPEDIA
  },
  {
    value: linkType.ACCESS,
    label: linkType.ACCESS
  },
  {
    value: linkType.BOOKING,
    label: linkType.BOOKING
  }
]

export const LINK_CONSTRAINT = {
  linkType: {
    presence: { disallowEmpty: true },
    inclusion: _.values(linkType)
  },
  linkUrl: {
    presence: { disallowEmpty: true },
    url: true,
    length: { maximum: 200 }
  }
}

export const LINK_NORMALISER = {
  linkUrl: {
    trim: true
  }
}

export const LINK_EDITOR_FORM_NAME = 'LinkEditor'
