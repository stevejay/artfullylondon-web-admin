const POSTCODE_DISTRICT_REGEX = /^[A-Z]{1,2}[0-9]{1,2}/
const NEWLINES_REGEX = /\n/g

export function formatAddressForDisplay (address, postcode) {
  return address.replace(NEWLINES_REGEX, ', ') + ', ' + postcode
}

export function getPostcodeDistrict (postcode) {
  var matches = (postcode || '').match(POSTCODE_DISTRICT_REGEX)
  return matches ? matches[0] : null
}
