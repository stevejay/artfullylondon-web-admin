// @flow

const MAPBOX_WIDTH = 500;
const MAPBOX_HEIGHT = 300;
const MAPBOX_ZOOM = 14;

export function createMapboxStaticImageUrl(
  latitude: number,
  longitude: number
) {
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/pin-s+865CD6(${longitude},${latitude})/${longitude},${latitude},${MAPBOX_ZOOM},0.00,0.00/${MAPBOX_WIDTH}x${MAPBOX_HEIGHT}@2x?access_token=${process
    .env.REACT_APP_MAPBOX_ACCESS_KEY || ""}`;
}

export function createGoogleMapsUrl(latitude: number, longitude: number) {
  return `https://www.google.com/maps/?q=${latitude},${longitude}`;
}
