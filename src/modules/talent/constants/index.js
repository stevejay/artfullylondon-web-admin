import talentType from '_src/entities/types/talent-type'

export const EDIT_TALENT_FORM_NAME = 'EditTalent'

export const TALENT_TYPES_DROPDOWN_OPTIONS = [
  {
    value: talentType.INDIVIDUAL,
    label: talentType.INDIVIDUAL
  },
  {
    value: talentType.GROUP,
    label: talentType.GROUP
  }
]

export const TALENT_CONSTRAINT = {
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

export const TALENT_NORMALISER = {
  firstNames: {
    trim: true
  },
  lastName: {
    trim: true
  },
  commonRole: {
    trim: true
  },
  weSay: {
    trim: true
  }
}
