import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import ImagePlaceholder from './image-placeholder'
import * as image from '_src/lib/image'
import * as entityConstants from '_src/constants/entity'
import './image-grid-image.scss'

class ImageGridImage extends ShouldNeverUpdateComponent {
  render () {
    const { imageId, size, type } = this.props

    if (imageId) {
      const imageUrl = image.createEntityEditPreviewImageUrl(imageId)
      return <img src={imageUrl} styleName={size} />
    } else {
      return <ImagePlaceholder size={size} type={type} />
    }
  }
}

ImageGridImage.propTypes = {
  imageId: PropTypes.string,
  type: PropTypes.oneOf(entityConstants.EDITABLE_ENTITY_TYPES).isRequired,
  size: PropTypes.oneOf(['tiny', 'very-small', 'small', 'medium']).isRequired
}

export default ImageGridImage
