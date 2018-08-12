// @flow

import type { LinkArray, Link } from "../flow-types";

import _ from "lodash";
import { Facebook, Twitter, Instagram, Home } from "grommet-icons";
import { EVENT } from "shared/types/entity-type";
import * as linkType from "../types/link-type";

export function tryGetLinkByType(links: ?LinkArray, type: string): ?Link {
  return _.find(links, link => link.type === type);
}

export function getLinkTypeDisplayValue(type: string, entityType: string) {
  return type === linkType.HOMEPAGE && entityType === EVENT
    ? "Event Page"
    : _.capitalize(type);
}

export function getLinkTypeIconForDisplay(type: string) {
  switch (type) {
    case linkType.FACEBOOK:
      return Facebook;
    case linkType.TWITTER:
      return Twitter;
    case linkType.INSTAGRAM:
      return Instagram;
    case linkType.HOMEPAGE:
      return Home;
    default:
      throw new Error(`link type ${type} not supported`);
  }
}
