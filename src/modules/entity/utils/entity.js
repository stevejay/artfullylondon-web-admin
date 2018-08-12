// @flow

import type { ImageArray } from "../flow-types";

import isEmpty from "lodash/isEmpty";
import _ from "lodash";
import * as bookingType from "../types/booking-type";
import * as costType from "../types/cost-type";
import * as eventType from "../types/event-type";
import * as occurrenceType from "../types/occurrence-type";
import { getDateDisplayValue, getDurationAsTimeDisplayValue } from "./time";

export function getEnumDisplayValue(value: ?string): string {
  return value ? _.startCase(_.lowerCase(value.replace("_", " "))) : "";
}

export function tryGetMainImage(images: ?ImageArray) {
  return isEmpty(images) || !images ? null : images[0];
}

export function getTalentDisplayName(firstNames: ?string, lastName: string) {
  return `${firstNames ? firstNames + " " : ""}${lastName}`;
}

export function getOccurrenceDisplayValue(
  type: string,
  dateFrom: ?string,
  dateTo: ?string,
  event: string
) {
  switch (type) {
    case occurrenceType.ONE_TIME:
      return getDateDisplayValue(dateFrom);
    case occurrenceType.BOUNDED:
      return dateFrom === dateTo
        ? `On ${getDateDisplayValue(dateFrom)}`
        : `From ${getDateDisplayValue(dateFrom)} to ${getDateDisplayValue(
            dateTo
          )}`;
    default:
      return event === eventType.PERFORMANCE
        ? "Ongoing performances"
        : "Permanent exhibition";
  }
}

export function getCostDisplayValue(
  type: string,
  costFrom: ?number,
  costTo: ?number
) {
  if (type === costType.PAID) {
    const from = costFrom != null ? formatCost(costFrom) : "";
    const to = costTo != null ? formatCost(costTo) : "";
    return from === to
      ? `Tickets are ${from}`
      : `Tickets cost ${from} to ${to}`;
  } else {
    return "Free event";
  }
}

function formatCost(cost: number) {
  return cost === 0 ? "free" : `£${cost.toFixed(2)}`;
}

export function getBookingDisplayValue(
  type: string,
  soldOut: ?boolean,
  bookingOpens: ?string
) {
  if (type === bookingType.NOT_REQUIRED) {
    return "Booking is not required";
  }

  if (soldOut) {
    return "This event has sold out but tickets may still be available on the day";
  }

  const bookingValue =
    type === bookingType.REQUIRED
      ? "Booking is required"
      : "Booking is required for non-members";

  return bookingOpens
    ? `${bookingValue} and opens on ${getDateDisplayValue(bookingOpens)}`
    : bookingValue;
}

export function getDescriptionDisplayHtml(
  description: ?string,
  descriptionCredit: ?string
) {
  if (!description) {
    return "<p><em>No description available.</em></p>";
  } else if (!descriptionCredit) {
    return description;
  } else {
    return description.replace(
      /<\/p>$/,
      ` <em>(Information by ${descriptionCredit}.)</em></p>`
    );
  }
}

export function getDurationDisplayValue(duration: ?string, event: string) {
  if (!duration) {
    return null;
  }
  const timeValue = getDurationAsTimeDisplayValue(duration);
  return event === eventType.PERFORMANCE
    ? `Duration around ${timeValue}`
    : `Allow around ${timeValue} for your visit`;
}

export function getAgeDisplayValue(minAge: ?number, maxAge: ?number) {
  if (minAge && maxAge) {
    return `${minAge} to ${maxAge} years`;
  } else if (!maxAge && minAge) {
    return `${minAge} years and over`;
  } else if (!minAge && maxAge) {
    return `To ${maxAge} years`;
  } else {
    return null;
  }
}
