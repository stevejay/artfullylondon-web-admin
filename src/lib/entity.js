import _ from 'lodash'

export function createEntityUrl (entityType, id) {
  return `/${entityType}/${id}`
}

export function createEntityEditUrl (entityType, id) {
  return `/${entityType}/edit/${id}`
}

export function processDescription (description, credit) {
  if (!description) {
    return '<p>We do not have a description.</p>'
  }

  let result = description

  if (credit) {
    result =
      result + '<p><em>(Description by ' + _.escape(credit) + '.)</em></p>'
  }

  return result
}

const emptyDescriptionStringRegex = /^<p>\s*(?:<br>|<br\/>|<br \/>)?\s*<\/p>$/

export function descriptionStringIsEmpty (descriptionStr) {
  return emptyDescriptionStringRegex.test(descriptionStr)
}
