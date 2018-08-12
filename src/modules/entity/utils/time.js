// @flow

import format from "date-fns/format";
import parse from "date-fns/parse";
import _ from "lodash";

export function getDayDisplayValue(day: ?number) {
  switch (day) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
    default:
      return "";
  }
}

const SERVER_DATE_FORMAT = "yyyy-MM-dd";
const DISPLAY_DATE_FORMAT = "do MMM yyyy";
const BASE_DATE = new Date();

export function getDateDisplayValue(date: ?string) {
  if (!date) {
    return "";
  }
  return format(
    parse(date, SERVER_DATE_FORMAT, BASE_DATE),
    DISPLAY_DATE_FORMAT
  );
}

const SERVER_TIME_FORMAT = "HH:mm";
const DISPLAY_TIME_FORMAT = "h:mm aaaa";

export function getTimeDisplayValue(time: ?string) {
  if (!time) {
    return "";
  }
  return format(
    parse(time, SERVER_TIME_FORMAT, BASE_DATE),
    DISPLAY_TIME_FORMAT
  );
}

export function getDurationAsTimeDisplayValue(duration: ?string) {
  if (!duration) {
    return "";
  }
  const hours = parseInt(duration.substring(0, 2), 10);
  const minutes = parseInt(duration.substring(3, 5), 10);
  return hours === 0
    ? `${minutes} ${minutes === 1 ? "minute" : "minutes"}`
    : minutes === 0
      ? `${hours} ${hours === 1 ? "hour" : "hours"}`
      : `${hours} ${hours === 1 ? "hr" : "hrs"} ${minutes} ${
          minutes === 1 ? "min" : "mins"
        }`;
}

export function getTimeRangeDisplayValue(from: ?string, to: ?string) {
  if (!from && !to) {
    return "All day";
  } else if (!from || !to) {
    return "";
  } else {
    return `${getTimeDisplayValue(from)} to ${getTimeDisplayValue(to)}`;
  }
}

export function getTimeAtDisplayValue(at: ?string) {
  return at ? getTimeDisplayValue(at) : "All day";
}

export function getNamedClosureDisplayValue(namedClosure: ?string) {
  return namedClosure ? _.startCase(namedClosure.toLowerCase()) : "";
}
