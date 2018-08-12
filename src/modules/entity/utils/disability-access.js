// @flow

import * as wheelchairAccessType from "../types/wheelchair-access-type";
import * as disabledBathroomType from "../types/disabled-bathroom-type";
import * as hearingFacilitiesType from "../types/hearing-facilities-type";

export function getAccessText(
  wheelchairAccess: string,
  disabledBathroom: string,
  hearingFacilities: string,
  hasAccessLink: boolean
) {
  let resultArray = [];

  switch (wheelchairAccess) {
    case wheelchairAccessType.FULL_ACCESS:
      resultArray.push("All spaces have wheelchair access.");
      break;
    case wheelchairAccessType.PARTIAL_ACCESS:
      resultArray.push("Only some spaces have wheelchair access.");
      break;
    case wheelchairAccessType.NO_ACCESS:
      resultArray.push("There is no wheelchair access.");
      break;
    default:
      break;
  }

  switch (disabledBathroom) {
    case disabledBathroomType.PRESENT:
      resultArray.push("There are accessible toilets.");
      break;
    case disabledBathroomType.NOT_PRESENT:
      resultArray.push("There are no accessible toilets.");
      break;
    default:
      break;
  }

  switch (hearingFacilities) {
    case hearingFacilitiesType.HEARING_LOOPS:
      resultArray.push("Hearing loops are present in all spaces.");
      break;
    case hearingFacilitiesType.PARTIAL_HEARING_LOOPS:
      resultArray.push("Hearing loops are present in some spaces.");
      break;
    case hearingFacilitiesType.NO_HEARING_LOOPS:
      resultArray.push("There are no hearing loops.");
      break;
    default:
      break;
  }

  const hasUnknownEntries =
    wheelchairAccess === wheelchairAccessType.UNKNOWN ||
    disabledBathroom === disabledBathroomType.UNKNOWN ||
    hearingFacilities === hearingFacilitiesType.UNKNOWN;

  if (!hasAccessLink && hasUnknownEntries) {
    resultArray.push(
      "Please contact the venue for more information on the available facilities."
    );
  }

  return resultArray.join(" ");
}
