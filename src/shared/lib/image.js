export function createImageUrl (imageId, resizedSize) {
  if (!imageId) {
    return null
  }

  const root = process.env.WEBSITE_ENTITY_IMAGES_ROOT_URL
  return `${root}/${imageId.substring(0, 2)}/${imageId.substring(2, 4)}/${imageId}/${resizedSize}.jpg`
}

export function createEntityEditPreviewImageUrl (imageId) {
  return createImageUrl(imageId, '120x120')
}
