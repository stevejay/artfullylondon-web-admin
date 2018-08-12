// @flow

import each from "jest-each";
import * as disabilityAccessUtils from "./disability-access";
import * as wheelchairAccessType from "../types/wheelchair-access-type";
import * as disabledBathroomType from "../types/disabled-bathroom-type";
import * as hearingFacilitiesType from "../types/hearing-facilities-type";

describe("getAccessText", () => {
  each([
    [
      wheelchairAccessType.FULL_ACCESS,
      disabledBathroomType.PRESENT,
      hearingFacilitiesType.HEARING_LOOPS,
      false,
      "All spaces have wheelchair access. There are accessible toilets. Hearing loops are present in all spaces."
    ],
    [
      wheelchairAccessType.FULL_ACCESS,
      disabledBathroomType.PRESENT,
      hearingFacilitiesType.HEARING_LOOPS,
      true,
      "All spaces have wheelchair access. There are accessible toilets. Hearing loops are present in all spaces."
    ],
    [
      wheelchairAccessType.UNKNOWN,
      disabledBathroomType.PRESENT,
      hearingFacilitiesType.HEARING_LOOPS,
      true,
      "There are accessible toilets. Hearing loops are present in all spaces."
    ],
    [
      wheelchairAccessType.UNKNOWN,
      disabledBathroomType.PRESENT,
      hearingFacilitiesType.HEARING_LOOPS,
      false,
      "There are accessible toilets. Hearing loops are present in all spaces. Please contact the venue for more information on the available facilities."
    ],
    [
      wheelchairAccessType.UNKNOWN,
      disabledBathroomType.UNKNOWN,
      hearingFacilitiesType.UNKNOWN,
      false,
      "Please contact the venue for more information on the available facilities."
    ],
    [
      wheelchairAccessType.UNKNOWN,
      disabledBathroomType.UNKNOWN,
      hearingFacilitiesType.UNKNOWN,
      true,
      ""
    ]
  ]).test(
    "%s, %s, %s, %b transforms to %s",
    (
      wheelchairAccess,
      disabledBathroom,
      hearingFacilities,
      hasAccessLink,
      expected
    ) => {
      const actual = disabilityAccessUtils.getAccessText(
        wheelchairAccess,
        disabledBathroom,
        hearingFacilities,
        hasAccessLink
      );
      expect(actual).toEqual(expected);
    }
  );
});
