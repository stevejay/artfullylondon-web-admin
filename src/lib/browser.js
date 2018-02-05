import window from 'global/window'

import * as browserConstants from '_src/constants/browser'

export function forceReflow (node) {
  node && node.scrollTop // eslint-disable-line
}

export function isDesktop () {
  return (
    !!window.matchMedia &&
    window.matchMedia('(min-device-width: 768px)').matches
  )
}

export function hasGeolocation () {
  return 'geolocation' in window.navigator
}

export function getCurrentLocation () {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      position =>
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }),
      err => reject(err)
    )
  })
}

export function calculateBrowserWidthType (width) {
  return width >= browserConstants.BROWSER_WIDTH_THRESHOLD
    ? browserConstants.BROWSER_WIDTH_TYPE_WIDE
    : browserConstants.BROWSER_WIDTH_TYPE_NARROW
}

export function addWindowEventListener (eventName, callback) {
  window.addEventListener(eventName, callback)
}

export function removeWindowEventListener (eventName, callback) {
  window.removeEventListener(eventName, callback)
}

export function getWindowInnerWidth () {
  return window.innerWidth
}
