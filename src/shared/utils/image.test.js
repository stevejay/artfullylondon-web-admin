// @flow

import each from "jest-each";
import * as imageUtils from "./image";

describe("createEntityImageUrl", () => {
  it("should create a url from an image id", () => {
    const result = imageUtils.createEntityImageUrl(
      "12345678AAAAAAAABBBBBBBBCCCCCCCC"
    );
    expect(result).toEqual(
      "https://images.root/12/34/12345678AAAAAAAABBBBBBBBCCCCCCCC/500x500.jpg"
    );
  });

  it("should handle no image id", () => {
    const result = imageUtils.createEntityImageUrl(null);
    expect(result).toEqual("");
  });
});

describe("createEntityThumbnailImageUrl", () => {
  it("should create a url from an image id", () => {
    const result = imageUtils.createEntityThumbnailImageUrl(
      "12345678AAAAAAAABBBBBBBBCCCCCCCC"
    );
    expect(result).toEqual(
      "https://images.root/12/34/12345678AAAAAAAABBBBBBBBCCCCCCCC/120x120.jpg"
    );
  });

  it("should handle no image id", () => {
    const result = imageUtils.createEntityThumbnailImageUrl(null);
    expect(result).toEqual("");
  });
});

describe("asCssColor", () => {
  each([[null, null], ["123456", "#123456"]]).test(
    "%s returns %s",
    (color, expected) => {
      const actual = imageUtils.asCssColor(color);
      expect(actual).toEqual(expected);
    }
  );
});
