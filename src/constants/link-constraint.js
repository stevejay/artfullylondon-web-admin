import { ALLOWED_LINK_TYPES } from '_src/constants/link'

export default {
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
