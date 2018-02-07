import PropTypes from 'prop-types'

export const TAG_EDITOR_FORM_NAME = 'TagEditor'

export const TAG_TYPE_MEDIUM = 'medium'
export const TAG_TYPE_STYLE = 'style'
export const TAG_TYPE_GEO = 'geo'
export const TAG_TYPE_AUDIENCE = 'audience'

export const ALLOWED_TAG_TYPES = [
  TAG_TYPE_MEDIUM,
  TAG_TYPE_STYLE,
  TAG_TYPE_GEO,
  TAG_TYPE_AUDIENCE
]

// TODO uppercase
export const constraint = {
  label: {
    presence: { disallowEmpty: true },
    length: { minimum: 3, maximum: 50 },
    format: /[&\w àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ-]+/i
  }
}

// TODO uppercase
export const normaliser = {
  label: {
    trim: true,
    undefinedIfEmpty: true
  }
}

export const TAG_PROP_TYPES = PropTypes.shape({
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
})
