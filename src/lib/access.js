import wheelchairAccessType from '_src/entities/wheelchair-access-type'
import disabledBathroomType from '_src/entities/disabled-bathroom-type'
import hearingFacilitiesType from '_src/entities/hearing-facilities-type'

export function getAccessText (
  wheelchairAccess,
  disabledBathroom,
  hearingFacilities,
  hasAccessLink
) {
  let resultArray = []

  switch (wheelchairAccess) {
    case wheelchairAccessType.FULL_ACCESS:
      resultArray.push('All spaces have wheelchair access.')
      break
    case wheelchairAccessType.PARTIAL_ACCESS:
      resultArray.push('Only some spaces have wheelchair access.')
      break
    case wheelchairAccessType.NO_ACCESS:
      resultArray.push('There is no wheelchair access.')
      break
  }

  switch (disabledBathroom) {
    case disabledBathroomType.PRESENT:
      resultArray.push('There are accessible toilets.')
      break
    case disabledBathroomType.NOT_PRESENT:
      resultArray.push('There are no accessible toilets.')
      break
  }

  switch (hearingFacilities) {
    case hearingFacilitiesType.HEARING_LOOPS:
      resultArray.push('Hearing loops are present in all spaces.')
      break
    case hearingFacilitiesType.PARTIAL_HEARING_LOOPS:
      resultArray.push('Hearing loops are present in some spaces.')
      break
    case hearingFacilitiesType.NO_HEARING_LOOPS:
      resultArray.push('There are no hearing loops.')
      break
  }

  const hasUnknownEntries =
    wheelchairAccess === wheelchairAccessType.UNKNOWN ||
    disabledBathroom === disabledBathroomType.UNKNOWN ||
    hearingFacilities === hearingFacilitiesType.UNKNOWN

  if (!hasAccessLink && hasUnknownEntries) {
    resultArray.push(
      'Contact the venue for information on the available facilities.'
    )
  }

  return resultArray.join(' ')
}
