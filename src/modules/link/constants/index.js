import * as linkConstants from '_src/constants/link'

export const ALLOWED_LINK_TYPES = [
  linkConstants.LINK_TYPE_FACEBOOK,
  linkConstants.LINK_TYPE_HOMEPAGE,
  linkConstants.LINK_TYPE_TWITTER,
  linkConstants.LINK_TYPE_WIKIPEDIA,
  linkConstants.LINK_TYPE_ACCESS,
  linkConstants.LINK_TYPE_INSTAGRAM,
  linkConstants.LINK_TYPE_BOOKING
]

export const LINK_TYPE_DROPDOWN_OPTIONS = [
  {
    value: linkConstants.LINK_TYPE_HOMEPAGE,
    label: linkConstants.LINK_TYPE_HOMEPAGE
  },
  {
    value: linkConstants.LINK_TYPE_FACEBOOK,
    label: linkConstants.LINK_TYPE_FACEBOOK
  },
  {
    value: linkConstants.LINK_TYPE_TWITTER,
    label: linkConstants.LINK_TYPE_TWITTER
  },
  {
    value: linkConstants.LINK_TYPE_INSTAGRAM,
    label: linkConstants.LINK_TYPE_INSTAGRAM
  },
  {
    value: linkConstants.LINK_TYPE_WIKIPEDIA,
    label: linkConstants.LINK_TYPE_WIKIPEDIA
  },
  {
    value: linkConstants.LINK_TYPE_ACCESS,
    label: linkConstants.LINK_TYPE_ACCESS
  },
  {
    value: linkConstants.LINK_TYPE_BOOKING,
    label: linkConstants.LINK_TYPE_BOOKING
  }
]

export const LINK_CONSTRAINT = {
  linkType: {
    presence: { disallowEmpty: true },
    inclusion: ALLOWED_LINK_TYPES
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
