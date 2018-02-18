const POSTCODE_DISTRICT_REGEX = /^[A-Z]{1,2}[0-9]{1,2}/

export function getPostcodeDistrict (postcode) {
  var matches = (postcode || '').match(POSTCODE_DISTRICT_REGEX)
  return matches ? matches[0] : null
}
