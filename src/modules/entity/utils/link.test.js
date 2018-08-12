// @flow

import each from "jest-each";
import * as linkUtils from "./link";
import * as linkType from "../types/link-type";
import * as entityType from "shared/types/entity-type";

describe("tryGetLinkByType", () => {
  each([
    [[{ type: linkType.WIKIPEDIA, url: "foo" }], linkType.FACEBOOK, undefined],
    [
      [{ type: linkType.WIKIPEDIA, url: "foo" }],
      linkType.WIKIPEDIA,
      { type: linkType.WIKIPEDIA, url: "foo" }
    ]
  ]).test("%o searched for %s returns %o", (links, type, expected) => {
    const actual = linkUtils.tryGetLinkByType(links, type);
    expect(actual).toEqual(expected);
  });
});

describe("getLinkTypeDisplayValue", () => {
  each([
    [linkType.WIKIPEDIA, entityType.TALENT, "Wikipedia"],
    [linkType.WIKIPEDIA, entityType.EVENT, "Wikipedia"],
    [linkType.HOMEPAGE, entityType.EVENT, "Event Page"]
  ]).test("%s of type %s transforms to %s", (type, entity, expected) => {
    const actual = linkUtils.getLinkTypeDisplayValue(type, entity);
    expect(actual).toEqual(expected);
  });
});
