export const addImageConstraint = {
  imageUrl: {
    presence: { disallowEmpty: true },
    url: true,
    length: { maximum: 400 }
  },
  copyright: {
    length: { maximum: 300 }
  }
}

export const updateImageConstraint = {
  copyright: {
    length: { maximum: 300 }
  }
}
