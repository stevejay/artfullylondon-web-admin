import PropTypes from 'prop-types'

export const TAG_EDITOR_FORM_NAME = 'TagEditor'

export const CONSTRAINT = {
  label: {
    presence: { disallowEmpty: true },
    length: { minimum: 3, maximum: 50 },
    format: /[&\w àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ-]+/i
  }
}

export const NORMALISER = {
  label: {
    trim: true,
    undefinedIfEmpty: true
  }
}

export const TAG_PROP_TYPES = PropTypes.shape({
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
})
