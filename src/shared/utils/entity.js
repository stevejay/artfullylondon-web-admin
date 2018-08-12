// @flow

import * as React from "react";
import {
  Attraction as EventIcon,
  Home as VenueIcon,
  Sort as EventSeriesIcon,
  User as Talent
} from "grommet-icons";
import * as entityType from "shared/types/entity-type";

export function getEntityTypeDisplayName(type: string): string {
  switch (type) {
    case entityType.EVENT:
      return "Event";
    case entityType.EVENT_SERIES:
      return "Event Series";
    case entityType.VENUE:
      return "Venue";
    case entityType.TALENT:
      return "Talent";
    default:
      return "";
  }
}

export function getEntityTypeIcon(type: string): React.ElementType {
  switch (type) {
    case entityType.EVENT_SERIES:
      return EventSeriesIcon;
    case entityType.VENUE:
      return VenueIcon;
    case entityType.TALENT:
      return Talent;
    default:
      return EventIcon;
  }
}
