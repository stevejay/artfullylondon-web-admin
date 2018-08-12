// @flow

import each from "jest-each";
import * as entityUtils from "./entity";
import * as bookingType from "../types/booking-type";
import * as costType from "../types/cost-type";
import * as eventType from "../types/event-type";
import * as occurrenceType from "../types/occurrence-type";

describe("tryGetMainImage", () => {
  each([
    [[], null],
    [[{ id: "foo" }], { id: "foo" }],
    [[{ id: "foo" }, { id: "bar" }], { id: "foo" }]
  ]).test("%o returns %o", (images, expected) => {
    const actual = entityUtils.tryGetMainImage(images);
    expect(actual).toEqual(expected);
  });
});

describe("getTalentDisplayName", () => {
  each([
    ["Carrie", "Cracknell", "Carrie Cracknell"],
    [null, "Cracknell", "Cracknell"]
  ]).test("%s %s transforms to %s", (firstNames, lastName, expected) => {
    const actual = entityUtils.getTalentDisplayName(firstNames, lastName);
    expect(actual).toEqual(expected);
  });
});

describe("getOccurrenceDisplayValue", () => {
  each([
    [
      occurrenceType.ONE_TIME,
      "2018-01-18",
      "2018-01-18",
      eventType.PERFORMANCE,
      "18th Jan 2018"
    ],
    [
      occurrenceType.BOUNDED,
      "2018-01-18",
      "2018-01-18",
      eventType.PERFORMANCE,
      "On 18th Jan 2018"
    ],
    [
      occurrenceType.BOUNDED,
      "2018-01-18",
      "2018-02-18",
      eventType.PERFORMANCE,
      "From 18th Jan 2018 to 18th Feb 2018"
    ],
    [
      occurrenceType.CONTINUOUS,
      null,
      null,
      eventType.PERFORMANCE,
      "Ongoing performances"
    ],
    [
      occurrenceType.CONTINUOUS,
      null,
      null,
      eventType.EXHIBITION,
      "Permanent exhibition"
    ]
  ]).test(
    "%s %s %s %s transforms to %s",
    (type, dateFrom, dateTo, event, expected) => {
      const actual = entityUtils.getOccurrenceDisplayValue(
        type,
        dateFrom,
        dateTo,
        event
      );
      expect(actual).toEqual(expected);
    }
  );
});

describe("getCostDisplayValue", () => {
  each([
    [costType.PAID, 12.5, 14, "Tickets cost £12.50 to £14.00"],
    [costType.PAID, 12.5, 12.5, "Tickets are £12.50"],
    [costType.FREE, null, null, "Free event"]
  ]).test("%s %s %s transforms to %s", (type, costFrom, costTo, expected) => {
    const actual = entityUtils.getCostDisplayValue(type, costFrom, costTo);
    expect(actual).toEqual(expected);
  });
});

describe("getBookingDisplayValue", () => {
  each([
    [bookingType.NOT_REQUIRED, false, null, "Booking is not required"],
    [
      bookingType.REQUIRED,
      true,
      null,
      "This event has sold out but tickets may still be available on the day"
    ],
    [bookingType.REQUIRED, false, null, "Booking is required"],
    [
      bookingType.REQUIRED_FOR_NON_MEMBERS,
      false,
      null,
      "Booking is required for non-members"
    ],
    [
      bookingType.REQUIRED,
      false,
      "2018-01-18",
      "Booking is required and opens on 18th Jan 2018"
    ],
    [
      bookingType.REQUIRED_FOR_NON_MEMBERS,
      false,
      "2018-01-18",
      "Booking is required for non-members and opens on 18th Jan 2018"
    ]
  ]).test(
    "%s %o %s transforms to %s",
    (type, soldOut, bookingOpens, expected) => {
      const actual = entityUtils.getBookingDisplayValue(
        type,
        soldOut,
        bookingOpens
      );
      expect(actual).toEqual(expected);
    }
  );
});

describe("getDescriptionDisplayHtml", () => {
  each([
    [null, null, "<p><em>No description available.</em></p>"],
    ["<p>The description</p>", null, "<p>The description</p>"],
    [
      "<p>The description</p>",
      "Wikipedia",
      "<p>The description <em>(Information by Wikipedia.)</em></p>"
    ]
  ]).test(
    "%s with credit %s transforms to %s",
    (description, descriptionCredit, expected) => {
      const actual = entityUtils.getDescriptionDisplayHtml(
        description,
        descriptionCredit
      );
      expect(actual).toEqual(expected);
    }
  );
});

describe("getDurationDisplayValue", () => {
  each([
    [null, eventType.PERFORMANCE, null],
    ["00:10", eventType.PERFORMANCE, "Duration around 10 minutes"],
    ["01:10", eventType.EXHIBITION, "Allow around 1 hr 10 mins for your visit"]
  ]).test("%s %s transforms to %s", (duration, event, expected) => {
    const actual = entityUtils.getDurationDisplayValue(duration, event);
    expect(actual).toEqual(expected);
  });
});

describe("getAgeDisplayValue", () => {
  each([
    [1, 3, "1 to 3 years"],
    [16, null, "16 years and over"],
    [null, 16, "To 16 years"],
    [null, null, null]
  ]).test("%s %s transforms to %s", (minAge, maxAge, expected) => {
    const actual = entityUtils.getAgeDisplayValue(minAge, maxAge);
    expect(actual).toEqual(expected);
  });
});

describe("getEnumDisplayValue", () => {
  each([
    ["TALENT", "Talent"],
    ["ART_GALLERY", "Art Gallery"],
    ["", ""],
    [null, ""]
  ]).test("%s transforms to %s", (value, expected) => {
    const actual = entityUtils.getEnumDisplayValue(value);
    expect(actual).toEqual(expected);
  });
});
