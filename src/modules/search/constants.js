// @flow

import * as entityType from "shared/types/entity-type";

export const ENTITY_TYPE_OPTIONS = [
  { id: entityType.ALL, label: "in all" },
  { id: entityType.EVENT, label: "in events" },
  { id: entityType.EVENT_SERIES, label: "in event series" },
  { id: entityType.VENUE, label: "in venues" },
  { id: entityType.TALENT, label: "in talents" }
];

export const PAGE_SIZE = 24;
export const NONE_SELECTED = -1;
