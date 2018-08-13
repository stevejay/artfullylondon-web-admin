// @flow

import * as mapUtils from "./map";

describe("createMapboxStaticImageUrl", () => {
  it("should create a url", () => {
    const actual = mapUtils.createMapboxStaticImageUrl(1.5, 2.5);
    expect(actual).toEqual(
      "https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/pin-s+865CD6(2.5,1.5)/2.5,1.5,14,0.00,0.00/500x300@2x?access_token=AAAA"
    );
  });
});

describe("createGoogleMapsUrl", () => {
  it("should create a url", () => {
    const actual = mapUtils.createGoogleMapsUrl(1.5, 2.5);
    expect(actual).toEqual("https://www.google.com/maps/?q=1.5,2.5");
  });
});
