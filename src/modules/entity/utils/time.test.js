// @flow

import each from "jest-each";
import * as timeUtils from "./time";

describe("getNamedClosureDisplayValue", () => {
  each([[null, ""], ["CHRISTMAS_DAY", "Christmas Day"]]).test(
    "%s transforms to %s",
    (namedClosure, expected) => {
      const actual = timeUtils.getNamedClosureDisplayValue(namedClosure);
      expect(actual).toEqual(expected);
    }
  );
});

describe("getTimeAtDisplayValue", () => {
  each([[null, "All day"], ["20:18", "8:18 p.m."]]).test(
    "%s transforms to %s",
    (at, expected) => {
      const actual = timeUtils.getTimeAtDisplayValue(at);
      expect(actual).toEqual(expected);
    }
  );
});

describe("getTimeRangeDisplayValue", () => {
  each([
    [null, null, "All day"],
    ["20:18", null, ""],
    [null, "21:19", ""],
    ["20:18", "21:19", "8:18 p.m. to 9:19 p.m."]
  ]).test("from=%s and to=%s transforms to %s", (from, to, expected) => {
    const actual = timeUtils.getTimeRangeDisplayValue(from, to);
    expect(actual).toEqual(expected);
  });
});

describe("getDurationAsTimeDisplayValue", () => {
  each([
    [null, ""],
    ["00:01", "1 minute"],
    ["00:02", "2 minutes"],
    ["01:00", "1 hour"],
    ["02:00", "2 hours"],
    ["02:34", "2 hrs 34 mins"],
    ["01:01", "1 hr 1 min"]
  ]).test("%s transforms to %s", (duration, expected) => {
    const actual = timeUtils.getDurationAsTimeDisplayValue(duration);
    expect(actual).toEqual(expected);
  });
});

describe("getTimeDisplayValue", () => {
  each([
    [null, ""],
    ["", ""],
    ["00:02", "12:02 a.m."],
    ["01:00", "1:00 a.m."],
    ["12:00", "12:00 p.m."],
    ["13:00", "1:00 p.m."]
  ]).test("%s transforms to %s", (time, expected) => {
    const actual = timeUtils.getTimeDisplayValue(time);
    expect(actual).toEqual(expected);
  });
});

describe("getDateDisplayValue", () => {
  each([[null, ""], ["", ""], ["2018-01-19", "19th Jan 2018"]]).test(
    "%s transforms to %s",
    (time, expected) => {
      const actual = timeUtils.getDateDisplayValue(time);
      expect(actual).toEqual(expected);
    }
  );
});

describe("getDayDisplayValue", () => {
  each([[null, ""], [1, "Monday"]]).test(
    "%s transforms to %s",
    (time, expected) => {
      const actual = timeUtils.getDayDisplayValue(time);
      expect(actual).toEqual(expected);
    }
  );
});
