import * as constants from '_src/constants/access'

export function getAccessText (
  wheelchairAccessType,
  disabledBathroomType,
  hearingFacilitiesType,
  hasAccessLink
) {
  let resultArray = []

  if (wheelchairAccessType === constants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS) {
    resultArray.push('All spaces have wheelchair access.')
  } else if (
    wheelchairAccessType === constants.WHEELCHAIR_ACCESS_TYPE_PARTIAL_ACCESS
  ) {
    resultArray.push('Only some spaces have wheelchair access.')
  } else if (
    wheelchairAccessType === constants.WHEELCHAIR_ACCESS_TYPE_NO_ACCESS
  ) {
    resultArray.push('There is no wheelchair access.')
  }

  if (disabledBathroomType === constants.DISABLED_BATHROOM_TYPE_PRESENT) {
    resultArray.push('There are accessible toilets.')
  } else if (
    disabledBathroomType === constants.DISABLED_BATHROOM_TYPE_NOT_PRESENT
  ) {
    resultArray.push('There are no accessible toilets.')
  }

  if (
    hearingFacilitiesType === constants.HEARING_FACILITIES_TYPE_HEARING_LOOPS
  ) {
    resultArray.push('Hearing loops are present in all spaces.')
  } else if (
    hearingFacilitiesType ===
    constants.HEARING_FACILITIES_TYPE_PARTIAL_HEARING_LOOPS
  ) {
    resultArray.push('Hearing loops are present in some spaces.')
  } else if (
    hearingFacilitiesType === constants.HEARING_FACILITIES_TYPE_NO_HEARING_LOOPS
  ) {
    resultArray.push('There are no hearing loops.')
  }

  const hasAnUnknownEntry =
    wheelchairAccessType === constants.WHEELCHAIR_ACCESS_TYPE_UNKNOWN ||
    disabledBathroomType === constants.DISABLED_BATHROOM_TYPE_UNKNOWN ||
    hearingFacilitiesType === constants.HEARING_FACILITIES_TYPE_UNKNOWN

  if (!hasAccessLink && hasAnUnknownEntry) {
    resultArray.push(
      'Contact the venue for information on the available facilities.'
    )
  }

  return resultArray.join(' ')
}
