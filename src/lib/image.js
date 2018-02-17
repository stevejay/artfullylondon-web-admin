export function createImageUrl (imageId, resizedSize) {
  if (!imageId) {
    return null
  }

  const root = process.env.WEBSITE_ENTITY_IMAGES_ROOT_URL
  return `${root}/${imageId.substring(0, 2)}/${imageId.substring(2, 4)}/${imageId}/${resizedSize}.jpg`
}

export function createEventTalentImageUrl (imageId) {
  return createImageUrl(imageId, '120x120')
}

export function createEntityPageImageUrl (imageId) {
  return createImageUrl(imageId, '500x500')
}

export function createEntityEditPreviewImageUrl (imageId) {
  return createImageUrl(imageId, '120x120')
}

export function createItemsForImageCarousel ({
  id,
  ratio,
  copyright,
  dominantColor
}) {
  return {
    original: createImageUrl(id, '750x'),
    ratio,
    copyright,
    dominantColor
  }
}
