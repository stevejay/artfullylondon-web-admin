import * as imageLib from '_src/lib/image'

const DEFAULT_ENTITY_CARD_HEIGHT = 175

export function getEntityCardImageData (image) {
  return {
    height: DEFAULT_ENTITY_CARD_HEIGHT,
    url: imageLib.createImageUrl(image, '500x350')
  }
}
