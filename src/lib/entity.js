import _ from 'lodash'

const EMPTY_DESC_STRING_REGEX = /^<p>\s*(?:<br>|<br\/>|<br \/>)?\s*<\/p>$/

export function descriptionStringIsEmpty (descriptionStr) {
  return EMPTY_DESC_STRING_REGEX.test(descriptionStr)
}
