import * as venueConstants from '_src/constants/venue'

// TODO this is more of a set of URL helpers.

export function createPngIconUrl (name, isSelected) {
  return (
    process.env.WEBSITE_SITE_IMAGES_ROOT_URL +
    `/${name}${isSelected ? '-selected' : ''}.png`
  )
}

export function createVenueTypePngIconUrl (venueType, isSelected) {
  let imageName = 'townhouse'

  switch (venueType) {
    case venueConstants.VENUE_TYPE_THEATRE:
      imageName = 'theater'
      break
    case venueConstants.VENUE_TYPE_ART_GALLERY:
      imageName = 'artgallery'
      break
    case venueConstants.VENUE_TYPE_MUSEUM:
      imageName = 'museum'
      break
  }

  return createPngIconUrl(imageName, isSelected)
}

export function createHeroImageUrl (name, forMobile) {
  return (
    process.env.WEBSITE_SITE_IMAGES_ROOT_URL +
    `/hero-image/${name}${forMobile ? '.mobile' : ''}.jpg`
  )
}

export function createEntityCardImageUrl (imageId) {
  if (!imageId) {
    return null
  }

  return _createImageUrl(imageId, '500x350')
}

export function createEventTalentImageUrl (imageId) {
  return _createImageUrl(imageId, '120x120')
}

export function createEntityPageImageUrl (imageId) {
  return _createImageUrl(imageId, '500x500')
}

export function createEntityEditPreviewImageUrl (imageId) {
  return _createImageUrl(imageId, '120x120')
}

export function createItemsForImageCarousel ({
  id,
  ratio,
  copyright,
  dominantColor
}) {
  return {
    original: _createImageUrl(id, '750x'),
    ratio,
    copyright,
    dominantColor
  }
}

function _createImageUrl (imageId, resizedSize) {
  const root = process.env.WEBSITE_ENTITY_IMAGES_ROOT_URL
  return `${root}/${imageId.substring(0, 2)}/${imageId.substring(2, 4)}/${imageId}/${resizedSize}.jpg`
}
