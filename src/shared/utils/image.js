// @flow

const ENTITY_IMAGE_ROOT_URL: string =
  process.env.REACT_APP_ENTITY_IMAGES_ROOT_URL || "";

export function asCssColor(color: ?string): ?string {
  return color ? "#" + color : null;
}

export function createEntityImageUrl(imageId: ?string): string {
  return createImageUrl(imageId, "500x500");
}

export function createEntityThumbnailImageUrl(imageId: ?string): string {
  return createImageUrl(imageId, "120x120");
}

function createImageUrl(imageId: ?string, resizedSize: string): string {
  if (!imageId) {
    return "";
  }
  const root = ENTITY_IMAGE_ROOT_URL;
  const first = imageId.substring(0, 2);
  const second = imageId.substring(2, 4);
  return `${root}/${first}/${second}/${imageId}/${resizedSize}.jpg`;
}
