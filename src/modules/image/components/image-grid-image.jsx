import React from 'react'
import PropTypes from 'prop-types'
import { shouldUpdate } from 'recompose'

import ImagePlaceholder from '_src/modules/image/components/image-placeholder'
import * as image from '_src/lib/image'
import * as entityConstants from '_src/constants/entity'
import './image-grid-image.scss'

export const ImageGridImage = ({ imageId, size, type }) => {
  if (imageId) {
    const imageUrl = image.createEntityEditPreviewImageUrl(imageId)
    return <img src={imageUrl} styleName={size} />
  } else {
    return <ImagePlaceholder size={size} type={type} />
  }
}

ImageGridImage.propTypes = {
  imageId: PropTypes.string,
  type: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES).isRequired,
  size: PropTypes.oneOf(['tiny', 'very-small', 'small', 'medium']).isRequired
}

export default shouldUpdate(
  /* istanbul ignore next */
  () => false
)(ImageGridImage)
