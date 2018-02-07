export const IMAGE_EDITOR_FORM_NAME = 'ImageEditor'

export const ADD_IMAGE_NORMALISER = {
  imageUrl: {
    trim: true
  },
  copyright: {
    trim: true
  }
}

export const UPDATE_IMAGE_NORMALISER = {
  copyright: {
    trim: true
  }
}

export const ADD_IMAGE_CONSTRAINT = {
  imageUrl: {
    presence: { disallowEmpty: true },
    url: true,
    length: { maximum: 400 }
  },
  copyright: {
    length: { maximum: 300 }
  }
}

export const UPDATE_IMAGE_CONSTRAINT = {
  copyright: {
    length: { maximum: 300 }
  }
}
