import * as locationConstants from '_src/modules/location/constants'

const LONDON_BOUNDS = {
  north: locationConstants.MAX_LONDON_LAT,
  south: locationConstants.MIN_LONDON_LAT,
  east: locationConstants.MAX_LONDON_LNG,
  west: locationConstants.MIN_LONDON_LNG
}

export function isEmptyPin (pin) {
  return !pin || pin.lat === null || pin.lng === null
}

export function convertGoogleMapBoundsToNSEWBounds (googleMapBounds) {
  const northEast = googleMapBounds.getNorthEast()
  const soutWest = googleMapBounds.getSouthWest()

  return {
    north: northEast.lat(),
    west: soutWest.lng(),
    south: soutWest.lat(),
    east: northEast.lng()
  }
}

export function convertGoogleMapPointToLatLngPoint (googleMapPoint) {
  return {
    lat: googleMapPoint.lat(),
    lng: googleMapPoint.lng()
  }
}

export function createGoogleMapLinkUrl (lat, lng, zoom) {
  return `https://www.google.com/maps/place//@${lat},${lng},${zoom}z/`
}

export function convertGoogleMapZoomToInt (googleMapZoom) {
  return parseInt(googleMapZoom)
}

export function pointIsInLondonArea (point) {
  return (
    point.lat >= locationConstants.MIN_LONDON_LAT &&
    point.lat <= locationConstants.MAX_LONDON_LAT &&
    point.lng >= locationConstants.MIN_LONDON_LNG &&
    point.lng <= locationConstants.MAX_LONDON_LNG
  )
}

export function secondBoundsIsContainedByFirstBounds (
  firstBounds,
  secondBounds
) {
  return (
    firstBounds !== null &&
    secondBounds !== null &&
    firstBounds.north >= secondBounds.north &&
    firstBounds.south <= secondBounds.south &&
    firstBounds.east >= secondBounds.east &&
    firstBounds.west <= secondBounds.west
  )
}

export function containsAllOfLondon (bounds) {
  return secondBoundsIsContainedByFirstBounds(bounds, LONDON_BOUNDS)
}

export function mergeBounds (existingBounds, newBounds) {
  if (!existingBounds) {
    return newBounds
  }

  return {
    north: Math.max(existingBounds.north, newBounds.north),
    south: Math.min(existingBounds.south, newBounds.south),
    east: Math.max(existingBounds.east, newBounds.east),
    west: Math.min(existingBounds.west, newBounds.west)
  }
}

export function isContainedBy (mergedBounds, bounds) {
  return (
    !!mergedBounds &&
    mergedBounds.north >= bounds.north &&
    mergedBounds.south <= bounds.south &&
    mergedBounds.east >= bounds.east &&
    mergedBounds.west <= bounds.west
  )
}

export function enlargeBounds (existingBounds, multiplier) {
  const heightDelta = _calculateDelta(
    existingBounds.north,
    existingBounds.south,
    multiplier
  )

  const widthDelta = _calculateDelta(
    existingBounds.east,
    existingBounds.west,
    multiplier
  )

  return {
    north: existingBounds.north + heightDelta,
    south: existingBounds.south - heightDelta,
    east: existingBounds.east + widthDelta,
    west: existingBounds.west - widthDelta
  }
}

export function getBounds (centerPoint, zoom) {
  const latDelta = zoom === 14 ? 0.024 : 0.006
  const lngDelta = zoom === 14 ? 0.06 : 0.021

  return {
    north: centerPoint.lat + latDelta,
    south: centerPoint.lat - latDelta,
    west: centerPoint.lng - lngDelta,
    east: centerPoint.lng + lngDelta
  }
}

function _calculateDelta (a, b, multiplier) {
  const distance = a - b
  const newDistance = distance * multiplier
  return (newDistance - distance) / 2
}
