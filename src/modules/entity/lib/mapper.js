import RichTextEditor from 'react-rte'

import * as imageLib from '_src/lib/image'
import * as entityLib from '_src/lib/entity'
import * as entityConstants from '_src/constants/entity'

// TODO maybe make part of domain
const IMAGE_STATUS_PROCESSING = 'Processing'

export function getRichTextInitialValue (text) {
  return RichTextEditor.createValueFromString(text || '', 'html')
}

export function mapSubmittedDescription (description) {
  if (!description) {
    return null
  }

  const result = description.toString('html')
  return entityLib.descriptionStringIsEmpty(result) ? null : result
}

export function getLinksInitialValue (links) {
  return (links || []).map(link => ({
    key: link.type,
    type: link.type,
    url: link.url
  }))
}

export function mapSubmittedLinks (links) {
  return (links || []).map(link => ({
    type: link.type,
    url: link.url
  }))
}

export function getImagesInitialValue (images) {
  return (images || []).map((image, i) => ({
    key: image.id,
    id: image.id,
    copyright: image.copyright,
    isMain: i === 0,
    previewUrl: imageLib.createEntityEditPreviewImageUrl(image.id),
    ratio: image.ratio
  }))
}

export function mapSubmittedImages (images) {
  images = (images || [])
    .filter(image => image.status !== IMAGE_STATUS_PROCESSING)

  images = images
    .filter(image => image.isMain)
    .concat(images.filter(image => !image.isMain))

  return images.map(image => ({
    id: image.id,
    copyright: image.copyright,
    ratio: image.ratio
  }))
}

export function getValidStatusesInitialValue (status) {
  switch (status) {
    case entityConstants.PENDING_STATUS:
      return [
        {
          value: entityConstants.PENDING_STATUS,
          label: entityConstants.PENDING_STATUS
        },
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
        },
        {
          value: entityConstants.DELETED_STATUS,
          label: entityConstants.DELETED_STATUS
        }
      ]
    case entityConstants.ACTIVE_STATUS:
      return [
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
        },
        {
          value: entityConstants.DELETED_STATUS,
          label: entityConstants.DELETED_STATUS
        }
      ]
    case entityConstants.DELETED_STATUS:
      return [
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
        },
        {
          value: entityConstants.DELETED_STATUS,
          label: entityConstants.DELETED_STATUS
        }
      ]
    case entityConstants.MERGED_STATUS:
      return [
        {
          value: entityConstants.MERGED_STATUS,
          label: entityConstants.MERGED_STATUS
        }
      ]
    default:
      return [
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
        }
      ]
  }
}
