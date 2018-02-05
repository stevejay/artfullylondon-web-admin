import * as accessConstants from '_src/constants/access'

export function getAccessText (
  wheelchairAccessType,
  disabledBathroomType,
  hearingFacilitiesType,
  hasAccessLink
) {
  let resultArray = []

  switch (wheelchairAccessType) {
    case accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS:
      resultArray.push('All spaces have wheelchair access.')
      break
    case accessConstants.WHEELCHAIR_ACCESS_TYPE_PARTIAL_ACCESS:
      resultArray.push('Only some spaces have wheelchair access.')
      break
    case accessConstants.WHEELCHAIR_ACCESS_TYPE_NO_ACCESS:
      resultArray.push('There is no wheelchair access.')
      break
  }

  switch (disabledBathroomType) {
    case accessConstants.DISABLED_BATHROOM_TYPE_PRESENT:
      resultArray.push('There are accessible toilets.')
      break
    case accessConstants.DISABLED_BATHROOM_TYPE_NOT_PRESENT:
      resultArray.push('There are no accessible toilets.')
      break
  }

  switch (hearingFacilitiesType) {
    case accessConstants.HEARING_FACILITIES_TYPE_HEARING_LOOPS:
      resultArray.push('Hearing loops are present in all spaces.')
      break
    case accessConstants.HEARING_FACILITIES_TYPE_PARTIAL_HEARING_LOOPS:
      resultArray.push('Hearing loops are present in some spaces.')
      break
    case accessConstants.HEARING_FACILITIES_TYPE_NO_HEARING_LOOPS:
      resultArray.push('There are no hearing loops.')
      break
  }

  const hasUnknownEntries =
    wheelchairAccessType === accessConstants.WHEELCHAIR_ACCESS_TYPE_UNKNOWN ||
    disabledBathroomType === accessConstants.DISABLED_BATHROOM_TYPE_UNKNOWN ||
    hearingFacilitiesType === accessConstants.HEARING_FACILITIES_TYPE_UNKNOWN

  if (!hasAccessLink && hasUnknownEntries) {
    resultArray.push(
      'Contact the venue for information on the available facilities.'
    )
  }

  return resultArray.join(' ')
}
