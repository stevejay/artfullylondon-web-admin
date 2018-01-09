export const LINK_TYPE_WIKIPEDIA = 'Wikipedia'
export const LINK_TYPE_FACEBOOK = 'Facebook'
export const LINK_TYPE_TWITTER = 'Twitter'
export const LINK_TYPE_HOMEPAGE = 'Homepage'
export const LINK_TYPE_ACCESS = 'Access'
export const LINK_TYPE_INSTAGRAM = 'Instagram'
export const LINK_TYPE_BOOKING = 'Booking'

export const ALLOWED_LINK_TYPES = [
  LINK_TYPE_FACEBOOK,
  LINK_TYPE_HOMEPAGE,
  LINK_TYPE_TWITTER,
  LINK_TYPE_WIKIPEDIA,
  LINK_TYPE_ACCESS,
  LINK_TYPE_INSTAGRAM,
  LINK_TYPE_BOOKING
]

export const LINK_TYPE_DROPDOWN_OPTIONS = [
    { value: LINK_TYPE_HOMEPAGE, label: LINK_TYPE_HOMEPAGE },
    { value: LINK_TYPE_FACEBOOK, label: LINK_TYPE_FACEBOOK },
    { value: LINK_TYPE_TWITTER, label: LINK_TYPE_TWITTER },
    { value: LINK_TYPE_INSTAGRAM, label: LINK_TYPE_INSTAGRAM },
    { value: LINK_TYPE_WIKIPEDIA, label: LINK_TYPE_WIKIPEDIA },
    { value: LINK_TYPE_ACCESS, label: LINK_TYPE_ACCESS },
    { value: LINK_TYPE_BOOKING, label: LINK_TYPE_BOOKING }
]

export const ADD_LINK = 'link/ADD_LINK'
export const DELETE_LINK = 'link/DELETE_LINK'
