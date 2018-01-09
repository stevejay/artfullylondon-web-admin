import { ALLOWED_LINK_TYPES } from '_src/constants/link'

export default {
  firstNames: {
    length: { maximum: 200 }
  },
  lastName: {
    presence: { disallowEmpty: true },
    length: { maximum: 200 }
  },
  commonRole: {
    presence: { disallowEmpty: true },
    length: { maximum: 200 }
  },
  links: {
    length: {
      maximum: ALLOWED_LINK_TYPES.length,
      tooLong: 'has too many elements'
    }
  },
  images: {
    length: {
      maximum: 10,
      tooLong: 'has too many elements'
    }
  },
  weSay: {
    length: { maximum: 300 }
  }
}
