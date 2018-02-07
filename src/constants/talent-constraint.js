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
